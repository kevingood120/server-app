import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Customer from './customer.entity';
import { Like, Repository } from 'typeorm';
import { PaginationData } from 'src/interfaces';
import { CustomerQuery } from './customer.validations';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepo: Repository<Customer>,
    ) {}

    async addOrUpdate(customer: Customer) {
        return await this.customerRepo.save(customer)
    }

    async findAll({ page, limit, name, ...rest }: CustomerQuery): Promise<PaginationData<Customer>> {
        const [rows, count] = await this.customerRepo.findAndCount({
            relations: ['address'],
            take: limit,
            skip: (page - 1) * limit,
            where: {
                name: Like(`%${name ?? ''}%`),
                ...rest
            }
        })

        return {
            rows,
            meta: {
                limit,
                page,
                totalPages: Math.ceil(count / limit),
                totalRows: count
            }
        }
    }

    async findOne(customer: Partial<Customer>) {
        return await this.customerRepo.findOne(customer)
    }
}
