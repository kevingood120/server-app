import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ITask } from 'src/interfaces';
import Task from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {}

    @Post()
    async add(@Body() task: Task) {
        return await this.taskService.add(task)
    }

    @Get()
    async findAll(@Query('desc') desc: string) {
        return await this.taskService.findAll(desc)
    }

    @Get('/findOne')
    async findOne(@Query() query: ITask) {
        return await this.taskService.findOne(query)
    }
}
