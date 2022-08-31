import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { TenantService } from './../tenant/tenant.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Tenant } from './../tenant/entity/tenant.entity';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [UserController],
  providers: [UserService, TenantService, JwtService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserMiddleware)
      .exclude({
        path: 'users',
        method: RequestMethod.GET,
      })
      .forRoutes(UserController);
  }
}
