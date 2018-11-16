
export default class Validation {
  public static createControl(params: IParams) : IControl {
    const basicParams: IBasic = {
      hasError: false,
      touched: false
    }

    return {...params, ...basicParams}
  }
}
