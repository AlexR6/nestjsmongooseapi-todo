import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import {
  Category,
  CategoryDocument,
} from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategoryWhereId(
    categoryId: string,
  ): Promise<Category> {
    return this.categoryModel.findById(
      categoryId,
    );
  }

  async getCategories(
    userId: string,
  ): Promise<Category[]> {
    return this.categoryModel.find({ userId });
  }

  async updateCategory(
    categoryDto: CategoryDto,
    categoryId: string,
  ): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(
      categoryId,
      categoryDto,
      { new: true },
    );
  }

  async createCategory(
    categoryDto: CategoryDto,
    userId: string,
  ): Promise<Category> {
    const category = new this.categoryModel({
      ...categoryDto,
      userId,
    });
    return category.save();
  }

  async deleteCategory(
    categoryId: string,
  ): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(
      categoryId,
      { new: true },
    );
  }
}
