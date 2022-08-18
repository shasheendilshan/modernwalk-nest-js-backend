import { Injectable } from '@nestjs/common';
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

  getProductById(id: number) {
    return this.productRepository.findOne({ where: { id: id } });
  }

  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }

  updateProductById(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  addProduct(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }
}
