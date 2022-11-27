import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailResolver } from './email.resolver';
import { EmailController } from './email.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: configService.get('jwtExpirationTime') },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [EmailService, EmailResolver],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
