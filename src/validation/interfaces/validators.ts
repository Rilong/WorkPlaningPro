export interface IValidator {
  message: string
  value?: any
}

export interface IValidators {
  required?: boolean | IValidator
  email?: boolean | IValidator
  minLength?: IValidator
  maxLength?: IValidator
  confirm?: IValidator
}
