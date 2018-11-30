import * as React from 'react'
import UserForm from '../userForm/userForm'
import {IFormControl} from '../../validation/interfaces/validation';
import Validation from '../../validation/validation';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IUser} from "../../interfaces/user/IUser";
import {userLogin} from "../../store/actions/user/actions";

interface IProps {
  changeForm: () => void,
  isLoading?: boolean,
  onLogin?: (userData: IUser) => void
}

interface IState {
  hasError: boolean
  formControls: IFormControl
}

const login = class Login extends React.Component <IProps, IState> {

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
    const controls: IFormControl = {...this.state.formControls}

    controls[name].touched = true
    controls[name].value = value
    controls[name] = Validation.valid(controls, name)
    this.setState({formControls: controls, hasError: Validation.hasErrorForm(controls)})
  }

  public onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.onLogin({email: this.state.formControls.email.value, password: this.state.formControls.password.value})
  }

  public render() : React.ReactNode {
    return (
      <UserForm formControls={this.state.formControls}
                changeForm={this.props.changeForm}
                changeLabel={'Реєстрація'}
                formChangeHandler={(event) => this.onSubmitHandler(event)}
                inputChange={this.onChangeHandler}
                submitLabel={'Увійти'}
                disabled={this.state.hasError}
                loading={this.props.isLoading}/>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    isLoading: state.UserReducer.userLoading
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLogin: (userData: IUser) => dispatch<any>(userLogin(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(login)