import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import Brand from './brand.entity';
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
    async add(@Body() brand: Brand) {
        return await this.brandService.add(brand)
    }
}
