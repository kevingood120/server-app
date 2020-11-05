import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, MaxLength, Min, Validate } from "class-validator";
import Decimal from "decimal.js";
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint";
import { UniqueConstraint } from "src/constraints/unique.constraint";
import { ITask } from "src/interfaces";
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
@Entity()
export default class Task implements ITask {
    

    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @IsUUID()
    @IsOptional()
    @Validate(ExistsByIdConstraint, [Task])
    id?: string;

    @Validate(UniqueConstraint, [Task])
    @IsNotEmpty()
    @IsString()
    @Column({ type: 'varchar', length: 100})
    @MaxLength(100)
    desc: string;

    @IsNumberString()
    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2})
    price: Decimal;

}