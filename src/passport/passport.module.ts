import { forwardRef, Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportResolver } from './passport.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passport } from './passport.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passport]),
    forwardRef(() => UsersModule),
  ],
  providers: [PassportService, PassportResolver],
  exports: [PassportService],
})
export class PassportModule {}
