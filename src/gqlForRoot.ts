import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import {
  createProductIdsLoader,
  createProductLabelIdsLoader,
} from './products/products.loader';
import {
  createOrderAddressIdsLoader,
  createOrderProductIdsLoader,
  createOrderUserIdsLoader,
  createOrderPaymentIdsLoader,
  createOrderResultsIdsLoader,
} from './orders/orders.loader';
import { createPassportIdsLoader } from './passport/passport.loader';
import { createUserIdsLoader } from './users/users.loader';
import { createAddressUserIdsLoader } from './addresses/addresses.loader';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ProductsService } from './products/products.service';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { AddressesService } from './addresses/addresses.service';
import { UsersService } from 'src/users/users.service';
import { OrdersService } from './orders/orders.service';
import { PassportService } from './passport/passport.service';
import { PassportModule } from './passport/passport.module';
import { createCardsIdsLoader } from './cards/cards.loader';
import { CardsService } from './cards/cards.service';
import { CardsModule } from './cards/cards.module';
import {
  createLabelsProductsLoader,
  createParentLabelIdsLoader,
  createSubLabelIdsLoader,
} from './labels/labels.loader';
import { createImagesLoader } from './image/image.loader';
import { LabelsService } from './labels/labels.service';
import { LabelsModule } from './labels/labels.module';
import { ImageService } from './image/image.service';
import { ImagesModule } from './image/image.module';
import { ResultsService } from './results/results.service';
import { ResultsModule } from './results/results.module';
import { createResultOrderIdsLoader } from './results/results.loader';

export const GqlForRootAsync = {
  imports: [
    ConfigModule,
    ProductsModule,
    AddressesModule,
    UsersModule,
    OrdersModule,
    PassportModule,
    CardsModule,
    LabelsModule,
    ImagesModule,
    ResultsModule,
  ],
  useFactory: async (
    configService: ConfigService,
    productsService: ProductsService,
    usersService: UsersService,
    addressesService: AddressesService,
    ordersService: OrdersService,
    passportService: PassportService,
    cardsService: CardsService,
    labelsService: LabelsService,
    imageService: ImageService,
    resultsService: ResultsService,
  ) => ({
    context: ({ req, res }) => ({
      req,
      res,
      productIdsLoader: createProductIdsLoader(productsService),
      productLabelIdsLoader: createProductLabelIdsLoader(productsService),
      orderUserIdsLoader: createOrderUserIdsLoader(usersService),
      orderAddressIdsLoader: createOrderAddressIdsLoader(addressesService),
      orderProductIdsLoader: createOrderProductIdsLoader(ordersService),
      orderPaymentIdsLoader: createOrderPaymentIdsLoader(ordersService),
      orderResultsIdsLoader: createOrderResultsIdsLoader(ordersService),
      addressUserIdsLoader: createAddressUserIdsLoader(usersService),
      userIdsLoader: createUserIdsLoader(usersService),
      passportIdsLoader: createPassportIdsLoader(passportService),
      cardsIdsLoader: createCardsIdsLoader(cardsService),
      parentLabelIdsLoader: createParentLabelIdsLoader(labelsService),
      subLabelIdsLoader: createSubLabelIdsLoader(labelsService),
      imagesLabelsLoader: createImagesLoader(imageService, 'labels'),
      labelsProductsLoader: createLabelsProductsLoader(labelsService),
      resultOrderIdsLoader: createResultOrderIdsLoader(ordersService),
    }),
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    cors: {
      origin: configService.get('corsOrigin'),
      credentials: true,
    },
  }),
  inject: [
    ConfigService,
    ProductsService,
    UsersService,
    AddressesService,
    OrdersService,
    PassportService,
    CardsService,
    LabelsService,
    ImageService,
    ResultsService,
  ],
};
