import { IsUUID, IsOptional, Validate, IsNotEmpty, Max, MaxLength } from "class-validator"
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint"
import { UniqueConstraint } from "src/constraints/unique.constraint"
import { IBrand } from "src/interfaces"
import { Column, Entity, Generated, PrimaryColumn } from "typeorm"

@Entity()
export default class Brand implements IBrand {
    @PrimaryColumn({type: 'uuid', length: 36})
    @IsUUID()
    @IsOptional()
    @Validate(ExistsByIdConstraint)
    @Generated('uuid')
    id!: string

    @IsNotEmpty()
    @MaxLength(255)
    @Validate(UniqueConstraint)
    @Column({type: 'varchar', length: 255, unique: true})
    desc: string
}