import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getConnection, Repository } from "typeorm";

@ValidatorConstraint({name: 'unique', async: true})
export class UniqueConstraint implements ValidatorConstraintInterface {

    async validate(value: any, args: ValidationArguments) {
        const { id } = args.object as any
        const { property } = args
        const [entity] = args.constraints
        const repo: Repository<typeof entity> = (await getConnection()).getRepository(entity)
        const newEntity = await repo.findOne({
            where: {
                [property]: value
            }
        })

        return !(newEntity && newEntity.id !== id)
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} exists in db`
    }
}