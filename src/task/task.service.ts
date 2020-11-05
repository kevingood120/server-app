import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITask } from 'src/interfaces';
import { Like, Repository } from 'typeorm';
import Task from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepo: Repository<Task>
    ) {}

    async add(task: ITask) {
        return await this.taskRepo.save(task)
    }

    async findAll(desc: string) {
        return await this.taskRepo.find({
            where: {
                desc: Like(`%${desc}%`)
            },
            take: 15
        })
    }

    async findOne(query: ITask) {
        return await this.taskRepo.findOne({
            where: query
        })
    }
}
