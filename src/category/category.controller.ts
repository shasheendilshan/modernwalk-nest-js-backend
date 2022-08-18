import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryDto } from './dto/update-category.dto';

@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Delete('/:id')
  deleteCategoryById(@Param('id') id: number) {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch('/:id')
  updateCategoryById(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.categoryService.updateCategoryById(id, updateCategoryDto);
  }

  @Post()
  addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }
}
