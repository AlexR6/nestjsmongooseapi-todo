import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema/todo.schema';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async getTodos(): Promise<Todo[]> {
    return this.todoModel.find();
  }

  async createTodo(todoDto: TodoDto): Promise<Todo> {
    const todo = new this.todoModel(todoDto);
    return todo.save();
  }

  async updateTodo(todoDto: TodoDto, todoId: string): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(todoId, todoDto, { new: true });
  }

  async deleteTodo(todoId: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(todoId);
  }
}
