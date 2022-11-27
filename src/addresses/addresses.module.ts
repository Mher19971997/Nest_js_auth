import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './addresses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressesService, AddressesResolver],
  exports: [AddressesService],
})
export class AddressesModule {}
