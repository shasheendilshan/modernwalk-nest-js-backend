import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from 'src/user/entity/user.entity';
import { Product } from './product/entity/product.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { TenantModule } from './tenant/tenant.module';
import { Tenant } from './tenant/entity/tenant.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '10445609',
      database: 'modernwalk',
      entities: [User, Product, Category, Tenant],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    TenantModule,
    AuthModule,
  ],
})
export class AppModule {}
