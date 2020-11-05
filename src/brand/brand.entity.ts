import { IBrand } from "src/interfaces"
import { Column, Entity, Generated, PrimaryColumn } from "typeorm"

@Entity()
export default class Brand implements IBrand {
    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    id!: string

    @Column({type: 'varchar', length: 255, unique: true})
    desc: string
}