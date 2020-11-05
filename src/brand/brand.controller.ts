import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { IBrand } from 'src/interfaces';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
    constructor(
        readonly brandService: BrandService
    ) {}

    @Get()
    async findAll() {
        return await this.brandService.findAll()
    }

    @Post()
    async add(@Body() brand: IBrand) {
        return await this.brandService.add(brand)
    }
}
