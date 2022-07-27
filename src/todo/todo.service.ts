import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Todo,
  TodoDocument,
} from './schema/todo.schema';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<TodoDocument>,
  ) {}

  async getTodos(
    userId: string,
    active: number,
    offset: number,
    limit: number,
    categoryId: string,
  ): Promise<Todo[]> {
    if (categoryId == '') {
      return this.todoModel
        .find({
          userId,
          active,
        })
        .skip(offset)
        .limit(limit);
    } else {
      return this.todoModel
        .find({
          userId,
          active,
          categoryId,
        })
        .skip(offset)
        .limit(limit);
    }
  }

  async createTodo(
    todoDto: TodoDto,
    userId: string,
  ): Promise<Todo> {
    const todo = new this.todoModel({
      ...todoDto,
      userId,
    });
    return todo.save();
  }

  async updateTodo(
    todoDto: TodoDto,
    todoId: string,
  ): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(
      todoId,
      todoDto,
      { new: true },
    );
  }

  async updateTodoStatus(
    status: number,
    todoId: string,
  ): Promise<Todo> {
    const data = {
      active: status,
      endAt: new Date(),
    };
    return this.todoModel.findByIdAndUpdate(
      todoId,
      data,
      { new: true },
    );
  }

  async deleteTodo(
    todoId: string,
  ): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(
      todoId,
    );
  }
}
