import {IBasic, IControl, IFormControl, IParams} from './interfaces/validation';

export default class Validation {
  public static createControl(params: IParams) : IControl {
    const basicParams: IBasic = {
      hasError: false,
      touched: false
    }

    return {...params, ...basicParams}
  }

  public static createControlWithDefalut(type: string, label: string, validators: IValidators): IControl {
    return Validation.createControl({
      type,
      label,
      errorMessage: '',
      value: '',
      validators
    })
  }

  public static setValidationControl(control: IControl, hasError: boolean = false, message: string = ''): IControl {
    control.hasError = hasError
    control.errorMessage = message
    return control
  }


  public static isNotHasErrorForm(formControls: IFormControl) {
    let isHasError = true
    Object.keys(formControls).forEach((key) => {
      isHasError = !formControls[key].hasError && formControls[key].touched && isHasError
    })
    return isHasError
  }
}
