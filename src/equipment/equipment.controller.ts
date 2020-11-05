import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IEquipment } from 'src/interfaces';
import Equipment from './equipment.entity';
import { EquipmentService } from './equipment.service';
import { EquipmentQuery } from './equipment.validations';

@Controller('equipment')
export class EquipmentController {
    constructor(
        readonly equipService: EquipmentService
    ) { }

    @Post()
    async save(@Body() values: Equipment) {
        return await this.equipService.save(values)
    }

    @Get()
    async findAll(@Query() query: EquipmentQuery) {
        return await this.equipService.findAll(query)
    }

    @Get('findOne')
    async findOne(@Query() query: IEquipment) {
        return await this.equipService.findOne(query)
    }
}
