import { IsNotEmpty, IsOptional, IsUUID, Length, Matches, MaxLength, Validate, ValidateNested } from "class-validator"
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint"
import { UniqueConstraint } from "src/constraints/unique.constraint"
import { IAddress } from "src/interfaces"
import { Entity, PrimaryColumn, Column, Generated, CreateDateColumn } from "typeorm"

@Entity()
export default class Address implements IAddress {
    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @IsUUID()
    @IsOptional()
    @Validate(ExistsByIdConstraint)
    id!: string

    @Validate(UniqueConstraint)
    @Matches(/\d{5}-\d{3}/)
    @Column({type: 'char', length: 9, unique: true})
    zipcode: string

    @IsNotEmpty()
    @MaxLength(200)
    @Column('varchar', { length: 200})
    street: string

    @IsNotEmpty()
    @MaxLength(100)
    @Column('varchar', { length: 100})
    neighborhood: string

    @IsNotEmpty()
    @MaxLength(100)
    @Column('varchar', { length: 100})
    city: string

    @IsNotEmpty()
    @Length(2)
    @Column('char', { length: 2})
    state: string

    @CreateDateColumn({
        insert: true
    })
    readonly createdAt: Date
}