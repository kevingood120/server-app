import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IBrand } from 'src/interfaces';
import { Repository } from 'typeorm';
import Brand from './brand.entity';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private brandRepo: Repository<Brand>,
    ){ }

    async add(brand: IBrand) {
        return await this.brandRepo.save(brand)
    }

    async update(id: string, brand: IBrand) {
        const brands = await this.brandRepo.findByIds([id])
        if(brands.length === 0 || id !== brand.id) return null
        else {
            return await this.brandRepo.save(brand)
        }
    }

    async findAll() {
        return await this.brandRepo.find()
    }
}
