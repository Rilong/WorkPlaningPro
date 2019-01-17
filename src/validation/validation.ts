import {IBasic, IControl, IFormControl, IParams} from './interfaces/validation';
import {IValidator, IValidators} from './interfaces/validators';
import Validators from './validators';
import {ERROR_EMAIL, ERROR_REQUIRED} from './validationMessages';

export default class Validation {
  public static createControl(params: IParams): IControl {
    const basicParams: IBasic = {
      hasError: false,
      touched: false
    }

    return {...params, ...basicParams}
  }

  public static createControlWithDefault(type: string, label: string, validators: IValidators = null): IControl {
    return Validation.createControl({
      type,
      label,
      errorMessage: '',
      value: '',
      validators
    })
  }

  public static valid(formControls: IFormControl, name: string): IControl {
    formControls = {...formControls}
    const control: IControl = formControls[name]

    if (control.validators === null) {
      return control
    }

    if (control.validators.required && Validators.isRequired(control.value)) {
      return this.setErrorValidationControl(control, control.validators.required, ERROR_REQUIRED)
    }

    if (control.validators.email && Validators.isEmail(control.value)) {
      return this.setErrorValidationControl(control, control.validators.email, ERROR_EMAIL)
    }

    if (control.validators.minLength && Validators.isMinLength(control.value, control.validators.minLength.value)) {
      return this.setErrorValidationControl(control, control.validators.minLength)
    }

    if (control.validators.maxLength && Validators.isMaxLength(control.value, control.validators.maxLength.value)) {
      return this.setErrorValidationControl(control, control.validators.maxLength)
    }

    if (control.validators.confirm && Validators.isConfirm(control.value, formControls[control.validators.confirm.value].value)) {
      return this.setErrorValidationControl(control, control.validators.confirm)
    }

    return this.clearErrorValidationControl(control)
  }

  public static setErrorValidationControl(control: IControl, validator: IValidator | boolean | number, message: string = ''): IControl {
    control.hasError = true
    control.errorMessage = typeof validator === 'boolean' || typeof validator === 'number' ? message : validator.message
    return control
  }

  public static clearErrorValidationControl(control: IControl) {
    control.hasError = false
    control.errorMessage = ''
    return control
  }

  public static hasErrorForm(formControls: IFormControl) {
    let isHasError = true
    Object.keys(formControls).forEach((key) => {
      isHasError = !formControls[key].hasError && formControls[key].touched && isHasError
    })
    return !isHasError
  }
}
