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
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/user/decorator/get-user.decorator';
import { JwtGuard } from '../jwt-utils/guard/jwt.guard';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('all')
  getTodos(@GetUser('id') userId: string) {
    return this.todoService.getTodos(userId);
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
    @Param() params: any,
  ) {
    return this.todoService.updateTodo(
      todoDto,
      params.id,
    );
  }

  @Delete('delete/:id')
  deleteTodo(@Param() params: any) {
    return this.todoService.deleteTodo(params.id);
  }
}
