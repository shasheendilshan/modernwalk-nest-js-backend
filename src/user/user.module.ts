import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.GET,
    });
  }
}
