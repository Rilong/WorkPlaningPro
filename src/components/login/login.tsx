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

export default class Login extends React.Component <IProps, IState> {

  public state = {
    hasError: true,
    formControls: {
      'email': Validation.createControlWithDefault('text', 'E-mail', {
        required: true
      }),
      'password': Validation.createControlWithDefault('password', 'Пароль', {
        required: true
      })
    }
  }

  public onChangeHandler = (name: string, value: string) => {
    const controls: IFormControl = this.state.formControls

    controls[name].value = value
    controls[name] = Validation.valid(controls[name])
    this.setState({formControls: controls})
  }

  public onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  public render() : React.ReactNode {
    return (
      <UserForm formControls={this.state.formControls}
                changeForm={this.props.changeForm}
                changeLabel={'Реєстрація'}
                formChangeHandler={(event) => this.onSubmitHandler(event)}
                inputChange={this.onChangeHandler}
                submitLabel={'Увійти'}
                disabled={this.state.hasError}/>
    )
  }
}
