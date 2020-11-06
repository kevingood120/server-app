import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsUUID, MaxLength, Validate, ValidateNested } from "class-validator";
import Brand from "src/brand/brand.entity";
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint";
import { UniqueConstraint } from "src/constraints/unique.constraint";
import { IBrand, IEquipment } from "src/interfaces";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique('UNIQUE_MODEL_BRAND', ['brand.id', 'model'])
export default class Equipment implements IEquipment {

    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @IsUUID()
    @IsOptional()
    @Validate(ExistsByIdConstraint)
    id?: string;

    @Column({ type: 'varchar', length: 200})
    @IsNotEmpty()
    @MaxLength(200)
    desc: string;

    @Column({ type: 'varchar', length: 200})
    @IsNotEmpty()
    @Validate(UniqueConstraint, ['model', 'brand.id'])
    @MaxLength(200)
    model: string;

    @ManyToOne(() => Brand)
    @JoinColumn()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    brand: IBrand;
    
}