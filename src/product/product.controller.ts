import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IProduct } from 'src/interfaces';
import Product from './product.entity';
import { ProductService } from './product.service';
import {
    ProductQuery
} from './product.validations'

@Controller('product')
export class ProductController {
    constructor(
        readonly productService: ProductService
    ) {}

    @Post()
    async add(@Body() values: Product) {
        return await this.productService.add(values)
    }

    @Get()
    async findAll(@Query() query: ProductQuery) {
        return await this.productService.findAll(query)
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() values: IProduct) {
        return await this.productService.update(id, values)
    }
}
