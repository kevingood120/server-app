import { IsInt, IsNotEmpty, IsNumberString, IsObject, IsOptional, IsString, IsUUID, Max, MaxLength, Min, Validate } from "class-validator";
import Decimal from "decimal.js";
import Brand from "src/brand/brand.entity";
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint";
import { IBrand, IProduct, IProductGroup } from "src/interfaces";
import ProductGroup from "src/product-group/product-group.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity()
export default class Product implements IProduct {

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
    @Validate(ExistsByIdConstraint, ['brand'])
    brand: IBrand;

    @ManyToOne(() => ProductGroup)
    @JoinColumn()
    @IsObject()
    @IsNotEmpty()
    @Validate(ExistsByIdConstraint, ['ProductGroup'])
    productGroup: IProductGroup

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