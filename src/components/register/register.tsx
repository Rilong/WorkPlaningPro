import * as React from 'react'
import UserForm from '../userForm/userForm'
import {IFormControl} from '../../validation/interfaces/validation';
import Validation from '../../validation/validation';

interface IProps {
  changeForm: () => void
}

interface IState {
  hasError: boolean
  formControls: IFormControl
}

export default class Register extends React.Component<IProps, IState> {

  public state = {
    hasError: true,
    formControls: {
      'email': Validation.createControlWithDefalut('text', 'E-mail', {
        required: true,
        email: true
      }),
      'password': Validation.createControlWithDefalut('password', 'Пароль', {
        required: true,
        minLength: 6
      }),
      'confirmPassword': Validation.createControlWithDefalut('password', 'Підтвердження пароля', {
        required: true,
        confirm: 'password'
      })
    }
  }

  public onChangeHandler(name: string, value: string) : void {
    console.log(name, value)
  }

  public onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  public render() : React.ReactNode {
    return (
      <UserForm formChangeHandler={this.onSubmitHandler}
                formControls={this.state.formControls}
                inputChange={this.onChangeHandler}
                changeForm={this.props.changeForm}
                changeLabel="Вхід"
                submitLabel="зареєструватися"
                disabled={this.state.hasError}/>
    )
  }
}
