import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { TaskTagRepository } from '../task-tag/task-category.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from '@project/shared/app-types';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskTagEntity } from '../task-tag/task-tag.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository,
    private readonly taskTagRepository: TaskTagRepository
  ) { }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const category = await this.taskCategoryRepository.findById(dto.category);
    const tags = await Promise.all(dto.tags
      .split(' ')
      .map(async (name) => {
        const tag = await this.taskTagRepository.findByName(name);
        if (tag) {
          return tag;
        }
        return await this.taskTagRepository.create(new TaskTagEntity({ name }));
      }));

    const taskEntity = new TaskEntity({ ...dto, category, status: TaskStatus.New, comments: [], tags, customerId: '22' });
    return this.taskRepository.create(taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async updateTask(_id: number, _dto: UpdateTaskDto): Promise<Task> {
    throw new Error('Not implemented…');
  }
}