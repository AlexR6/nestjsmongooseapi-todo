import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/jwt-utils/guard/jwt.guard';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
  ) {}

  @Get('/get/:id')
  getCategoryWhereId(
    @Param('id') categoryId: string,
  ) {
    return this.categoryService.getCategoryWhereId(
      categoryId,
    );
  }

  @Get('all')
  getCategories(@GetUser('id') userId: string) {
    return this.categoryService.getCategories(
      userId,
    );
  }

  @Post('new')
  createCategory(
    @Body() categoryDto: CategoryDto,
    @GetUser('id') userId: string,
  ) {
    return this.categoryService.createCategory(
      categoryDto,
      userId,
    );
  }

  @Put('update/:id')
  updateCategory(
    @Body() categoryDto: CategoryDto,
    @Param('id') categoryId: string,
  ) {
    return this.categoryService.updateCategory(
      categoryDto,
      categoryId,
    );
  }

  @Delete('delete/:id')
  deleteCategory(
    @Param('id') categoryId: string,
  ) {
    return this.categoryService.deleteCategory(
      categoryId,
    );
  }
}
