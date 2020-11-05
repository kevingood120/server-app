import { Controller, Get, Post, Body, Param, Query, Header } from '@nestjs/common';
import { AddressService } from './address.service';
import Address from './address.entity';
import { Data, IAddress, PaginationData, Search } from 'src/interfaces';
import { AddressQuery } from './address.validations';

@Controller('address')
export class AddressController {
    constructor (
        private addressService: AddressService
    ) { }

    @Get()
    async findAll(
        @Query() addressQuery: AddressQuery
    ): Promise<PaginationData<IAddress>> {
       return await this.addressService.findAll(addressQuery)
    }

    @Post()
    async add(@Body() address: Address) {
        return await this.addressService.add(address)
    }

    @Get("/findOne")
    async findOne(@Query() address: IAddress) {
        return await this.addressService.findOne(address)
    }
}
