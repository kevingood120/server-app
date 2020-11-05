import { IBrand, IProduct } from "src/interfaces";
import {
    IsOptional,
    IsString,
} from 'class-validator'
import { Transform, Type } from "class-transformer/decorators";
import Decimal from "decimal.js";
import { PaginationBase } from "src/validations/pagination.base";

export class ProductQuery extends PaginationBase implements Partial<IProduct> {

    @IsString()
    @IsOptional()
    id?: string;
    
    desc?: string;
    stock?: number;
    minStock?: number;
    unit?: number;
    brand?: IBrand;

    @Transform(value => new Decimal(value))
    purchasePrice?: Decimal;

    @Transform(value => new Decimal(value))
    salePrice?: Decimal;
}