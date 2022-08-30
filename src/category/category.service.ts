import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getAllCategoriesForTenant(tenantId: number): Promise<Category[]> {
    if (!tenantId)
      throw new BadRequestException('tenantId required as query parameter');
    return await this.categoryRepository.find({
      where: { tenantId: tenantId },
    });
  }
  async getCategoryById(id: number): Promise<Category> {
    let category = await this.categoryRepository.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException(`category id ${id} does not exist`);
    }
    return category;
  }
  async updateCategoryById(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.getCategoryById(id);
    return this.categoryRepository.update(id, updateCategoryDto);
  }
  async deleteCategoryById(id: number) {
    await this.getCategoryById(id);
    return this.categoryRepository.delete(id);
  }
  addCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }
}
