import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entity/user.entity';
import { Product } from './product/entity/product.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entity/category.entity';
import { TenantModule } from './tenant/tenant.module';
import { Tenant } from './tenant/entity/tenant.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '10445609',
      database: 'modern_walk',
      entities: [User, Product, Category, Tenant],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
