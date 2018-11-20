import * as React from 'react'
import UserForm from '../userForm/userForm'
import {connect} from 'react-redux'
import {IFormControl} from '../../validation/interfaces/validation';
import Validation from '../../validation/validation';
import {ERROR_PASSWORD_CONFIRM} from '../../validation/validationMessages';
import {Dispatch} from 'redux';
import {userRegister} from '../../store/actions/user/actions';
import {IUser} from '../../interfaces/user/IUser';

interface IProps {
  changeForm: () => void
  onRegister?: (userData: IUser) => void
}

interface IState {
  hasError: boolean
  formControls: IFormControl
}

const register = class Register extends React.Component<IProps, IState> {

  public state = {
    hasError: true,
    formControls: {
      'email': Validation.createControlWithDefault('text', 'E-mail', {
        required: true,
        email: true
      }),
      'password': Validation.createControlWithDefault('password', 'Пароль', {
        required: true,
        minLength: {message: 'Пароль має бути не меньше ніж 6 символів', value: 6}
      }),
      'confirmPassword': Validation.createControlWithDefault('password', 'Підтвердження пароля', {
        required: true,
        confirm: {message: ERROR_PASSWORD_CONFIRM, value: 'password'}
      })
    }
  }

  public onChangeHandler = (name: string, value: string) => {
    const controls: IFormControl = {...this.state.formControls}

    controls[name].touched = true
    controls[name].value = value
    controls[name] = Validation.valid(controls, name)
    this.setState({formControls: controls, hasError: Validation.hasErrorForm(controls)})
  }

  public onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.onRegister(null)
  }


  public render() : React.ReactNode {
    console.log(this.props)
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

function mapDispatchToProps(dispatch: Dispatch) {
    return {
      onRegister: (userData: IUser) => dispatch(userRegister(userData))
    }
}

export default connect(null, mapDispatchToProps)(register)
