import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        readonly userRepo: Repository<User>
    ) {}

    async add(user: IUser) {
        return await this.userRepo.save(user)
    }

    

}
