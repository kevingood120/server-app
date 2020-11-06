import { Validate, IsOptional, IsUUID, IsString, MaxLength, IsNotEmpty } from "class-validator";
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint";
import { UniqueConstraint } from "src/constraints/unique.constraint";
import { PrimaryColumn, Generated, Column, Entity } from "typeorm";
import {
    IProductGroup
} from '../interfaces'

@Entity()
export default class ProductGroup implements IProductGroup {

    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @Validate(ExistsByIdConstraint)
    @IsOptional()
    @IsUUID()
    id?: string

    @Column({type: 'varchar', length: 255})
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    @Validate(UniqueConstraint)
    desc: string;
}