export default class Validators {
  public static isRequired(value: string): boolean {
    return value.trim() === ''
  }

  public static isMinLength(value: string, length: number): boolean {
    return value.trim().length < length
  }

  public static isMaxLength(value: string, length: number): boolean {
    return value.trim().length > length
  }

  public static isConfirm(value: string, confirmingValue: string) {
    return value !== confirmingValue
  }

  public static isEmail(value: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !regex.test(value)
  }
}
