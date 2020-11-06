import { Entity, Column, PrimaryColumn, Generated, JoinColumn, OneToOne, OneToMany, ManyToOne, Repository, CreateDateColumn } from "typeorm"
import Address from "src/address/address.entity"
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Validate, ValidateNested } from "class-validator"
import { UniqueConstraint } from "src/constraints/unique.constraint"
import { CpfConstraint } from "src/constraints/cpf.constraint"
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint"
import { IAddress, ICustomer } from "src/interfaces"

@Entity()
export default class Customer implements ICustomer {

    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @IsUUID()
    @IsOptional()
    @Validate(ExistsByIdConstraint)
    id!: string

    @IsNotEmpty()
    @IsString()
    @Column({type: 'varchar', length: 200})
    name: string


    @IsString()
    @IsOptional()
    @Column({type: 'varchar', length: 13, nullable: true})
    @Matches(/\(\d{2}\)\d{4}-\d{4}/)
    tel: string

    @IsString()
    @IsOptional()
    @Matches(/\(\d{2}\)9\d{4}-\d{4}/)
    @Column({type: 'varchar', length: 14, nullable: true})
    cel: string

    @Matches(/\d{3}.\d{3}.\d{3}-\d{2}/)
    @IsNotEmpty()
    @Validate(UniqueConstraint)
    @Validate(CpfConstraint)
    @Column({type: 'varchar', length: 14, unique: true})
    cpf: string

    @IsNotEmpty()
    @IsEmail()
    @Validate(UniqueConstraint)
    @Column({type: 'varchar', length: 200})
    email: string

    @Column({type: 'varchar', length: 10})
    @IsNotEmpty()
    @MaxLength(10)
    addressNumber: string

    @Column({type: 'varchar', length: 255, nullable: true})
    comments!: string

    @Column({type: 'varchar', length: 50, nullable: true})
    complement!: string

    @ManyToOne(() => Address)
    @JoinColumn()
    @IsObject()
    @IsNotEmptyObject()
    @Validate(ExistsByIdConstraint, ['address'])
    address: IAddress

    @CreateDateColumn({
        insert: true
    })
    readonly createdAt: Date

}