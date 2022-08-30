import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all categories' })
  // getAllCategories() {
  //   return this.categoryService.getAllCategories();
  // }

  @Get()
  @ApiOperation({ summary: 'Get all categories for tenant' })
  getAllCategoriesForTenant(@Query('tenantId') tenantId: number) {
    return this.categoryService.getAllCategoriesForTenant(tenantId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get category using Id' })
  getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete category using Id' })
  deleteCategoryById(@Param('id') id: number) {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update category using Id' })
  updateCategoryById(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoryService.updateCategoryById(id, updateCategoryDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }
}
