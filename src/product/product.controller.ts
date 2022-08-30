import {
  Controller,
  Get,
  Delete,
  Patch,
  Post,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all products' })
  // getAllProducts() {
  //   return this.productService.getAllProducts();
  // }

  @Get()
  @ApiOperation({ summary: 'Get all products for tenant' })
  getAllProductsForTenant(@Query('tenantId') tenantId: number) {
    return this.productService.getAllProductsForTenant(tenantId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get product using Id' })
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete product using Id' })
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update product using Id' })
  updateProductById(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: number,
  ) {
    return this.productService.updateProductById(id, updateProductDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }
}
