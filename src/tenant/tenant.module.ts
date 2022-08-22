import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Tenant } from './entity/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
