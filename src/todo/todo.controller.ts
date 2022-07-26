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
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { JwtGuard } from '../jwt-utils/guard/jwt.guard';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('all/:active')
  getTodos(
    @GetUser('id') userId: string,
    @Param('active') active: number,
  ) {
    return this.todoService.getTodos(
      userId,
      active,
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
  @Put('update/end/:id')
  endTodo(@Param('id') todoId: string) {
    return this.todoService.endTodo(todoId);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update/begin/:id')
  beginTodo(@Param('id') todoId: string) {
    return this.todoService.beginTodo(todoId);
  }

  @Delete('delete/:id')
  deleteTodo(@Param('id') todoId: string) {
    return this.todoService.deleteTodo(todoId);
  }
}
