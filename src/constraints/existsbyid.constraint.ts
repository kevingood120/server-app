import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getConnection, Repository } from "typeorm";

@ValidatorConstraint({name: 'ExistsById', async: true})
export class ExistsByIdConstraint implements ValidatorConstraintInterface {

    async validate(value: any, args: ValidationArguments) {
        const [entity] = args.constraints
        const repo: Repository<typeof entity> = (await getConnection()).getRepository(entity)
        const newEntity = await repo.findOne({
            where: {
                id: value
            }
        })

        console.log(newEntity, entity)

        return !!newEntity
    }

    defaultMessage(args: ValidationArguments) {
        return `id not exists in db`
    }
}