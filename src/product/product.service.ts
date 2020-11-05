import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProduct, PaginationData } from 'src/interfaces';
import { Like, Repository } from 'typeorm';
import Product from './product.entity';
import { ProductQuery } from './product.validations';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) readonly productRepo: Repository<Product>
    ) {}

    async add(product: IProduct) {
        return await this.productRepo.save(product)
    }

    async update(id: string, product: IProduct) {
        const one = await this.productRepo.findOne({ id })
        if(one && id === product.id) 
            return await this.productRepo.save(product)
        else
            return null
    }

    async findAll({ page, limit, desc, ...rest }: ProductQuery): Promise<PaginationData<IProduct>> {
        const [rows, count] = await this.productRepo.findAndCount({
            take: limit,
            skip: Math.ceil((page - 1) * limit),
            where: {
                desc: Like(`%${desc ?? ''}%`),
                ...rest
            },
            relations: ['brand']
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
}
