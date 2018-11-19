import {IValidators} from './validators';

export interface IParams {
  label: string
  type: string
  value: string
  errorMessage: string
  validators: IValidators
}

export interface IBasic {
  hasError: boolean
  touched: boolean
}

export interface IControl extends IBasic, IParams {}

export interface IFormControl {
  [name: string]: IControl
}
