import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerQuery } from './customer.validations';
import { ICustomer } from 'src/interfaces';
import Customer from './customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(
        private customerService: CustomerService
    ) { }


    @Post()
    async addOrUpdate(@Body() customer: Customer) {
        return await this.customerService.addOrUpdate(customer)
    }

    @Get() 
    async findAll(@Query() paginationData: CustomerQuery) {
        
        return await this.customerService.findAll(paginationData)
    }

    @Get('/findOne')
    async findOne(@Query() customer: Partial<ICustomer>) {
        return await this.customerService.findOne(customer)
    }
}
