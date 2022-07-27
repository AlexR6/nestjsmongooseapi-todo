import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { request, Request } from 'express';
import { GetCategoryDto } from 'src/category/dto/get-category.dto';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { JwtGuard } from '../jwt-utils/guard/jwt.guard';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('all/:active/:offset/:limit/:category')
  getTodos(
    @GetUser('id') userId: string,
    @Param('active') active: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Param('category') categoryId: string,
  ) {
    if (categoryId == 'aucun') {
      categoryId = '';
    }
    return this.todoService.getTodos(
      userId,
      active,
      offset,
      limit,
      categoryId,
    );
  }

  @Post('new')
  createTodo(
    @Body() todoDto: TodoDto,
    @GetUser('id') userId: string,
  ) {
    return this.todoService.createTodo(
      todoDto,
      userId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  updateTodo(
    @Body() todoDto: TodoDto,
    @Param('id') todoId: string,
  ) {
    return this.todoService.updateTodo(
      todoDto,
      todoId,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Put('update/status/:id')
  updateTodoStatus(
    @Body('status') status: number,
    @Param('id') todoId: string,
  ) {
    return this.todoService.updateTodoStatus(
      status,
      todoId,
    );
  }

  @Delete('delete/:id')
  deleteTodo(@Param('id') todoId: string) {
    return this.todoService.deleteTodo(todoId);
  }
}
