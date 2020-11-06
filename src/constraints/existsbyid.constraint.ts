import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { get } from "lodash";
import { getConnection, Repository } from "typeorm";

@ValidatorConstraint({name: 'ExistsById', async: true})
export class ExistsByIdConstraint implements ValidatorConstraintInterface {

    async validate(value: any, args: ValidationArguments) {
        let targetName = args.targetName
        let id = value
        if(args.constraints && args.constraints.length) {
            targetName = args.constraints[0]
            if(typeof value === 'object') 
                id = get(value, 'id')
        }
        const repo: Repository<any> = (await getConnection()).getRepository(targetName)
        const newEntity = await repo.findOne({
            where: {
                id
            }
        })

        return !!newEntity
    }

    defaultMessage(args: ValidationArguments) {
        return `${get(args.constraints, 0) || args.targetName}.id not exists in db`
    }
}