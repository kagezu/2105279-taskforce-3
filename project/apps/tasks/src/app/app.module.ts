import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskTagModule } from './task-tag/task-tag.module';
import { TaskReviewModule } from './task-review/task-review.module';
import { TaskModule } from './task/task.module';
import { TaskCommentModule } from './task-comment/task-comment.module';

@Module({
  imports: [PrismaModule, TaskCategoryModule, TaskTagModule, TaskReviewModule, TaskModule, TaskCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
