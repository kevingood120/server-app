import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getConnection, Repository } from "typeorm";

@ValidatorConstraint({name: 'unique', async: true})
export class CpfConstraint implements ValidatorConstraintInterface {

    async validate(value: any, args: ValidationArguments) {
        if(String(value).length < 14) return false

        const cpfWithoutMask = String(value).replace(/[\D]/g, '') 
        const firstDigit = cpfWithoutMask.slice(9,10)
        const secondDigit = cpfWithoutMask.slice(10,11)

        let validate = false
        for(const char of cpfWithoutMask) {
            if(char !== firstDigit) validate = true
        }

        if(!validate) return false
        
        let firstResult = [10,9,8,7,6,5,4,3,2].map((item, i) => {
            const digit = parseInt(cpfWithoutMask[i])
            return digit * item
        }).reduce((prev, cur) => prev + cur, 0)

        firstResult = (firstResult * 10) % 11
        firstResult = firstResult > 9 ? 0 : firstResult

        if(firstResult.toString() === firstDigit) {
            let secondResult = [11,10,9,8,7,6,5,4,3,2].map((item, i) => {
                const digit = parseInt(cpfWithoutMask[i])
                return digit * item
            }).reduce((prev, cur) => prev + cur, 0)

            secondResult = (secondResult * 10) % 11
            secondResult = secondResult > 9 ? 0 : secondResult

            return secondResult.toString() === secondDigit
        }
        else return false
    }

    defaultMessage(args: ValidationArguments) {
        return `field ${args.property} is not valid cpf`
    }
}