import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'oneOf', async: false })
export class OneOfValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const possibleValues = args.constraints;
    return possibleValues.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    const possibleValues = args.constraints;
    return `Type must equal one of the following values: ${possibleValues.join(', ')}.`;
  }
}
