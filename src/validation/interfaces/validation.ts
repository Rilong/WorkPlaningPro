interface IParams {
  label: string
  type: string
  value: string
  errorMessage: string
  validators: IValidators
}

interface IBasic {
  hasError: boolean
  touched: boolean
}

interface IControl extends IBasic, IParams {}
