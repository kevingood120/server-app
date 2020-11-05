import { IAddress } from "src/interfaces";
import { PaginationBase } from "src/validations/pagination.base";

export class AddressQuery extends PaginationBase implements IAddress{
    zipcode: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    id: string
}