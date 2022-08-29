import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantService } from './../tenant/tenant.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private tenantService: TenantService,
  ) {}

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number) {
    let product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`product id ${id} does not exist`);
    }
    return product;
  }

  async deleteProduct(id: number) {
    await this.getProductById(id);
    return this.productRepository.delete(id);
  }

  async updateProductById(id: number, updateProductDto: UpdateProductDto) {
    await this.getProductById(id);
    return this.productRepository.update(id, updateProductDto);
  }

  async addProduct(createProductDto: CreateProductDto) {
    await this.tenantService.getTenantById(createProductDto.tenantId);
    return this.productRepository.save(createProductDto);
  }
}
