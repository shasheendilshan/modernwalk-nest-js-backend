import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { TenantService } from './../tenant/tenant.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { Tenant } from './../tenant/entity/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [UserController],
  providers: [UserService, TenantService],
})
export class UserModule {}
