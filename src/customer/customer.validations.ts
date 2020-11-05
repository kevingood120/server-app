import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Validate } from "class-validator";
import Address from "src/address/address.entity";
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint";
import { IAddress, ICustomer } from "src/interfaces";
import { PaginationBase } from "src/validations/pagination.base";

export class CustomerQuery extends PaginationBase implements Partial<ICustomer> {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string
}

export class CustomerAddress implements IAddress {
    @IsUUID()
    @IsNotEmpty()
    @Validate(ExistsByIdConstraint, [Address])
    id: string;
    
    zipcode: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}


