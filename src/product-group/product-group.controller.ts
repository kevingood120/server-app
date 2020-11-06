import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import Brand from 'src/brand/brand.entity';
import { IProduct } from 'src/interfaces';
import ProductGroup from './product-group.entity';
import { ProductGroupService } from './product-group.service';

@Controller('product-group')
export class ProductGroupController {
    constructor(
        readonly productGroup: ProductGroupService
    ) {}

    @Get('findOne')
    async findOne(@Query() query: IProduct) {
        return await this.productGroup.findOne(query)
    }

    @Get()
    async findAll(@Query('desc') desc: string) {
        return await this.productGroup.findAll(desc)
    }

    @Post()
    async save(@Body() values: ProductGroup) {
        return await this.productGroup.save(values)
    }
}
