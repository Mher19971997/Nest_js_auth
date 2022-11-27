import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Services])],
  providers: [ServicesService, ServicesResolver],
  exports: [ServicesService],
})
export class ServicesModule {}
