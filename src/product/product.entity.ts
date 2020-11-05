import { Transform } from "class-transformer/decorators";
import { IsDecimal, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, IsUUID, Max, MaxLength, Min, Validate } from "class-validator";
import Decimal from "decimal.js";
import Brand from "src/brand/brand.entity";
import { GreaterThanConstraint } from "src/constraints/greaterthan.constraints";
import { IBrand, IProduct } from "src/interfaces";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity()
export default class Product implements IProduct {

    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @IsOptional()
    @IsUUID()
    id!: string

    @Column({type: 'varchar', length: 255})
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    desc: string;

    @Column({type: 'int'})
    @IsInt()
    @IsNotEmpty()
    stock: number;

    @Column({type: 'int'})
    @IsInt()
    @IsNotEmpty()
    minStock: number;

    @Column({type: 'int'})
    @IsInt()
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    unit: number;

    @ManyToOne(() => Brand)
    @JoinColumn()
    @IsObject()
    @IsNotEmpty()
    brand?: IBrand;

    @IsNumberString()
    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10 , scale: 2, })
    purchasePrice: Decimal;

    @IsNumberString()
    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10 , scale: 2, })
    salePrice: Decimal;

    @CreateDateColumn({
        insert: true
    })
    readonly createdAt: Date
}