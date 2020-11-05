import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Address from './address.entity';
import { IAddress, PaginationData, Search } from 'src/interfaces';
import { AddressQuery } from './address.validations';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private addressRepo: Repository<Address>,
    ) {}

    async add(address: Address) {
        return await this.addressRepo.save(address)
    }

    async findOne(address: IAddress) {
        return await this.addressRepo.findOne({
            where: address
        })
    }

    async findAll({page, limit, street, ...rest}: AddressQuery): Promise<PaginationData<IAddress>> {
        const [rows, count] =  await this.addressRepo.findAndCount({
            take: limit,
            skip: ((page - 1) * limit),
            where: {
                street: Like(`%${street}%`),
                ...rest
            }
        })

        return {
            rows,
            meta: {
                limit,
                page,
                totalRows: count,
                totalPages: Math.ceil(count / limit)
            }
        }
    }
}
