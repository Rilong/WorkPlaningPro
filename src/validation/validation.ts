
export default class Validation {
  public static createControl(params: IParams) : IControl {
    const basicParams: IBasic = {
      hasError: false,
      touched: false
    }

    return {...params, ...basicParams}
  }

  public static setValidationControl(control: IControl, hasError: boolean = false, message: string = ''): IControl {
    control.hasError = hasError
    control.errorMessage = message
    return control
  }
}
