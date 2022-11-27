import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { JwtAuthGuard } from 'src/auth/jwt-aut.guard';
import { CurrentUser } from 'src/users/current-user.guard';
import { User } from 'src/users/users.entity';
import { Address } from './addresses.entity';
import { AddressesService } from './addresses.service';
import { AddAddressInput } from './dto/add-address.input';
import { EditAddressInput } from './dto/edit-address.input';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Address])
  myAddresses(@CurrentUser() user: User): Promise<Address[]> {
    return this.addressesService.findMyAddresses(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  public async addAddress(
    @CurrentUser() user: User,
    @Args('input') input: AddAddressInput,
  ): Promise<Address> {
    return this.addressesService.addAddress(user.id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  public async editAddress(
    @CurrentUser() user: User,
    @Args('addressId', { type: () => ID }) addressId: string,
    @Args('input', { type: () => EditAddressInput }) input: EditAddressInput,
  ): Promise<Address> {
    return this.addressesService.editAddress(user.id, addressId, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  public async primaryAddress(@CurrentUser() user: User): Promise<Address> {
    return this.addressesService.findMyPrimaryAddress(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  public async removeMyPrimaryAddress(@CurrentUser() user: User) {
    return this.addressesService.removeMyPrimaryAddress(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  public async editMyPrimaryAddress(
    @CurrentUser() user: User,
    @Args('addressId', { type: () => ID }) addressId: string,
  ): Promise<Address> {
    return this.addressesService.editMyPrimaryAddress(addressId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [Address])
  public async removeAddress(
    @CurrentUser() user: User,
    @Args({ name: 'addressId', type: () => ID })
    addressId: string,
  ) {
    return this.addressesService.removeAddress(user.id, addressId);
  }

  @ResolveField('user')
  async user(
    @Parent() address: Address,
    @Context('addressUserIdsLoader')
    addressUserIdsLoader: DataLoader<string, Address>,
  ) {
    const { userId } = address;
    return addressUserIdsLoader.load(userId);
  }
}
