import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './../user/user.service';
import { TenantService } from './../tenant/tenant.service';
import { User } from './../user/entity/user.entity';
import { Tenant } from './../tenant/entity/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, TenantService],
})
export class AuthModule {}
