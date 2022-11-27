import { Args, Query, Resolver } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Services } from './services.entity';

@Resolver(() => Services)
export class ServicesResolver {
  constructor(private servicesService: ServicesService) {}

  @Query(() => Services)
  public async getServiceByKey(
    @Args('key', { type: () => String }) key: string,
  ): Promise<Services> {
    return this.servicesService.getByKey(key);
  }
}
