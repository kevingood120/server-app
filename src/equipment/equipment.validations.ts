import { IsOptional, IsString, MaxLength } from "class-validator";
import { ICustomer, IEquipment } from "src/interfaces";
import { PaginationBase } from "src/validations/pagination.base";

export class EquipmentQuery extends PaginationBase implements Partial<IEquipment> {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    desc?: string
}