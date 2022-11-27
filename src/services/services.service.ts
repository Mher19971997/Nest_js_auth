import { Injectable } from '@nestjs/common';
import { Services } from './services.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) {}

  public async getByKey(key: string) {
    return this.servicesRepository.findOne({ key });
  }
}
