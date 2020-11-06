import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min, Validate } from "class-validator";
import { ExistsByIdConstraint } from "src/constraints/existsbyid.constraint";
import { UniqueConstraint } from "src/constraints/unique.constraint";
import { IUser } from "src/interfaces";
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, Repository } from "typeorm";

@Entity()
export default class User implements IUser {
    @PrimaryColumn({type: 'uuid', length: 36})
    @Generated('uuid')
    @IsUUID()
    @IsOptional()
    @Validate(ExistsByIdConstraint)
    id?: string;

    @Column({ type: 'varchar', length: 100})
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column({ type: 'varchar', length: 30, unique: true})
    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    @Validate(UniqueConstraint)
    username: string;

    @Column({ type: 'varchar', length: 36})
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsInt()
    @Min(0)
    @Max(2)
    @IsNotEmpty()
    @Column({ type: 'int'})
    role: number

    @Column({ type: 'varchar', length: 255})
    @IsNotEmpty()
    @IsString()
    avatarImg: string

    @CreateDateColumn({
        insert: true
    })
    readonly createdAt: string;

}