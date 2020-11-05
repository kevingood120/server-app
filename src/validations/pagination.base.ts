import { Type } from "class-transformer/decorators"
import { IsInt, IsNotEmpty } from "class-validator"

export abstract class PaginationBase {

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt() 
    page: number

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt() 
    limit: number
}