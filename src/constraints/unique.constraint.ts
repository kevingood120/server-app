import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getConnection, Repository } from "typeorm";
import {
    get,
    set
} from 'lodash'

@ValidatorConstraint({name: 'unique', async: true})
export class UniqueConstraint implements ValidatorConstraintInterface {

    async validate(value: any, args: ValidationArguments) {
        const obj = args.object as any
        const { id } = obj

        let where = { 
            [args.property]: args.value
        }

        if(args.constraints && args.constraints.length) 
            args.constraints.forEach(property => set(where, property, get(obj, property)))

        

        const repo: Repository<any> = (await getConnection()).getRepository(args.targetName)
        const newEntity = await repo.findOne({
            where,
            loadRelationIds: true
        })

        return !(newEntity && newEntity.id !== id)
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.constraints || args.property} exists in db`
    }
}