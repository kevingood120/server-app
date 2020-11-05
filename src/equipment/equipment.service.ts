import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEquipment, PaginationData } from 'src/interfaces';
import { Repository, Like } from 'typeorm';
import Equipament from './equipment.entity';
import { EquipmentQuery } from './equipment.validations';

@Injectable()
export class EquipmentService {
    constructor(
        @InjectRepository(Equipament)readonly equipRepo: Repository<Equipament>
    ) { }

    async save(values: IEquipment) {
        return await this.equipRepo.save(values)
    }

    async findAll({ limit, page, desc, ...rest }: EquipmentQuery): Promise<PaginationData<IEquipment>> {
        const [rows, count] = await this.equipRepo.findAndCount({
            relations: ['brand'],
            where: {
                desc: Like(`%${desc}%`),
                ...rest
            },
            skip: (page - 1) * limit,
            take: limit
        })

        return {
            rows,
            meta: {
                limit,
                page,
                totalPages: Math.ceil(count/limit),
                totalRows: count
            }
        }
    }

    async findOne(query: IEquipment) {
        return await this.equipRepo.findOne({
            relations: ['brand'],
            where: query
        })
    }
}
