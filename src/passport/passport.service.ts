import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterObjectNulls, testIsHaveNulls } from 'src/helpers/utils';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { PassportInput } from './dto/passport.input';
import { Passport } from './passport.entity';

@Injectable()
export class PassportService {
  constructor(
    @InjectRepository(Passport)
    private passportRepository: Repository<Passport>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async findById(id: string): Promise<Passport> {
    return this.passportRepository.findOne(id);
  }

  public async findPassportByIds(ids: readonly string[]) {
    return this.passportRepository
      .createQueryBuilder('passport')
      .where('passport.id IN(:...ids)', { ids })
      .getMany();
  }

  async addPassport(userId: string, input: PassportInput): Promise<Passport> {
    const newPassport = this.passportRepository.create();
    newPassport.passportNumber = input.passportNumber;
    const passport = await this.passportRepository.save(newPassport);
    await this.usersService.updatePassport(userId, passport.id);
    return passport;
  }

  async editPassport(userId: string, input: PassportInput): Promise<Passport> {
    const body = filterObjectNulls(input);
    testIsHaveNulls(body, input);
    const { passportId } = await this.usersService.findById(userId);
    if (passportId) {
      await this.passportRepository.update(
        { id: passportId },
        {
          ...input,
        },
      );
    } else return this.addPassport(userId, input);
    return this.findById(passportId);
  }
}
