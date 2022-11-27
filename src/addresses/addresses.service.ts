import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressBadRequestException } from 'src/helpers/errors';
import { filterObjectNulls, testIsHaveNulls } from 'src/helpers/utils';
import { Repository } from 'typeorm';
import { Address } from './addresses.entity';
import { AddAddressInput } from './dto/add-address.input';
import { EditAddressInput } from './dto/edit-address.input';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  public async findMyAddressesById(
    id: string,
    userId: string,
  ): Promise<Address> {
    return this.addressesRepository.findOne({
      where: [
        {
          id,
          userId,
        },
      ],
    });
  }

  public async findMyPrimaryAddress(userId: string): Promise<Address> {
    return this.addressesRepository.findOne({
      where: [
        {
          userId,
        },
      ],
    });
  }

  public async removeMyPrimaryAddress(userId: string) {
    return this.addressesRepository.update(
      { isPrimary: true, userId },
      {
        isPrimary: false,
      },
    );
  }

  public async editMyPrimaryAddress(
    id: string,
    userId: string,
  ): Promise<Address> {
    const primaryAddress = this.findMyPrimaryAddress(userId);
    if (primaryAddress) await this.removeMyPrimaryAddress(userId);

    await this.addressesRepository.update(
      { id, userId },
      {
        isPrimary: true,
      },
    );

    return this.findMyAddressesById(id, userId);
  }

  public async findMyAddresses(userId: string): Promise<Address[]> {
    return this.addressesRepository.find({
      where: [
        {
          userId,
        },
      ],
    });
  }

  public async findAddressUserByIds(ids: readonly string[]) {
    return this.addressesRepository
      .createQueryBuilder('address')
      .where('address.id IN(:...ids)', { ids })
      .leftJoinAndSelect('address.user', 'user')
      .getMany();
  }

  public async findAddressesByIds(ids: readonly string[]) {
    return this.addressesRepository
      .createQueryBuilder('address')
      .where('address.id IN(:...ids)', { ids })
      .getMany();
  }

  public async editAddress(
    userId: string,
    addressId: string,
    input: EditAddressInput,
  ): Promise<Address> {
    const body = filterObjectNulls(input);
    testIsHaveNulls(body, input);
    const address = await this.findMyAddressesById(addressId, userId);
    if (!address) {
      throw new AddressBadRequestException(addressId);
    }
    await this.addressesRepository.update(
      { id: addressId, userId: userId },
      {
        ...input,
      },
    );
    return this.findMyAddressesById(addressId, userId);
  }

  public async addAddress(
    userId: string,
    input: AddAddressInput,
  ): Promise<Address> {
    const {
      name,
      country,
      city,
      address,
      entrance,
      floor,
      apartment,
      comment,
    } = input;
    const newAddress = this.addressesRepository.create();
    newAddress.userId = userId;
    newAddress.name = name;
    newAddress.country = country;
    newAddress.city = city;
    newAddress.address = address;
    newAddress.comment = comment;
    newAddress.entrance = entrance || null;
    newAddress.apartment = apartment || null;
    newAddress.floor = floor || null;
    return this.addressesRepository.save(newAddress);
  }

  public async removeAddress(
    userId: string,
    addressId: string,
  ): Promise<Address[]> {
    const addresss = await this.findMyAddressesById(addressId, userId);

    if (!addresss) {
      throw new AddressBadRequestException(addressId);
    }
    await this.addressesRepository.softDelete({ id: addressId, userId });
    return this.findMyAddresses(userId);
  }
}
