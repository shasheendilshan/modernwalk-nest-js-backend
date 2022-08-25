import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  addProduct(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }
}
