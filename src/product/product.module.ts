import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { TenantService } from './../tenant/tenant.service';
import { ProductController } from './product.controller';
import { Product } from './entity/product.entity';
import { Tenant } from './../tenant/entity/tenant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [ProductController],
  providers: [ProductService, TenantService],
})
export class ProductModule {}
