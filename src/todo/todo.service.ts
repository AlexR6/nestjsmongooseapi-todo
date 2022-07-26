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
  ): Promise<Todo[]> {
    return this.todoModel.find({
      userId,
      active,
    });
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

  async endTodo(todoId: string): Promise<Todo> {
    const data = { active: 0, endAt: Date.now() };
    return this.todoModel.findByIdAndUpdate(
      todoId,
      data,
      { new: true },
    );
  }

  async beginTodo(todoId: string): Promise<Todo> {
    const data = { active: 1, endAt: null };
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
