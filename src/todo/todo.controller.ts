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
} from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('all')
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post('new')
  createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update/:id')
  updateTodo(@Body() todoDto: TodoDto, @Param() params: any) {
    return this.todoService.updateTodo(todoDto, params.id);
  }

  @Delete('delete/:id')
  deleteTodo(@Param() params: any) {
    return this.todoService.deleteTodo(params.id);
  }
}
