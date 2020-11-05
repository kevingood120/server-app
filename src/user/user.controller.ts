import { Body, Controller, Post } from '@nestjs/common';
import User from './user.entity';
import { UserService } from './user.service';
import bcrypt from 'bcrypt'

@Controller('user')
export class UserController {
    constructor(
        readonly userService: UserService
    ) {}

    @Post()
    async add(@Body() values: User) {
        values.password = await bcrypt.hash(values.password, 10)
        return await this.userService.add(values)
    }
}
