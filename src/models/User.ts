import {IUser} from '../interfaces/user/IUser'

export default class User implements IUser {
  public email: string
  public id: string
  public password: string

  constructor(id: string, email: string, password: string) {
    this.email = email
    this.id = id
    this.password = password
  }
}