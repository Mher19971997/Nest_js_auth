import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule, GraphqlInterceptor } from '@ntegral/nestjs-sentry';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { GqlForRootAsync } from './gqlForRoot';
import { PassportModule } from './passport/passport.module';
import { EmailModule } from './email/email.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: configService.get('jwtExpirationTime') },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('throttle.ttl'),
        limit: configService.get('throttle.limit'),
      }),
      inject: [ConfigService],
    }),

    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dsn: configService.get('sentry.dsn'),
        debug: true,
        environment: configService.get('sentry.environment'),
        release: 'some_release',
      }),
      inject: [ConfigService],
    }),

    GraphQLModule.forRootAsync(GqlForRootAsync),
    TypeOrmModule.forRoot({}),
    UsersModule,
    AddressesModule,
    PassportModule,
    EmailModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new GraphqlInterceptor(),
    },
  ],
})
export class AppModule {}
