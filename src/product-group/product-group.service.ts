import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductGroup } from 'src/interfaces';
import { Like, Repository } from 'typeorm';
import ProductGroup from './product-group.entity';

@Injectable()
export class ProductGroupService {
    constructor(
        @InjectRepository(ProductGroup) readonly productGroup: Repository<ProductGroup>
    ) {}

    async save(values: IProductGroup) {
        return await this.productGroup.save(values)
    }

    async findOne(where: IProductGroup) {
        return await this.productGroup.findOne({
            where
        })
    }

    async findAll(desc: string) {
        return await this.productGroup.find({
            take: 20,
            where: {
                desc: Like(`%${desc ?? ''}%`)
            }
        })
    }
}
