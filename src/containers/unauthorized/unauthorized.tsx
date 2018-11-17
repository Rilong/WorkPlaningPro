import * as React from 'react'
import * as classes from './styles.css'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Input from '../../components/input/input'
import UserForm from '../../components/userForm/userForm'
import Validation from '../../validation/validation'
import Validators from '../../validation/validators'
import {ERROR_EMAIL, ERROR_PASSWORD, ERROR_PASSWORD_CONFIRM, ERROR_REQUIRED} from '../../validation/validationMessages';

function createUserControl(type: string, label: string, validators: IValidators): IControl {
  return Validation.createControl({
    type,
    label,
    errorMessage: '',
    value: '',
    validators
  })
}

const unauthorized = class Unauthorized extends React.Component {

  public state = {
    formControls: {
      'email': createUserControl('text', 'E-mail', {
        required: true,
        email: true
      }),
      'password': createUserControl('password', 'Пароль', {
        required: true,
        minLength: 6
      }),
      'passwordConfirm': createUserControl('password', 'Підтвердження пароля', {
        required: true,
        confirm: 'password'

      })
    },
    hasError: true,
    isRegister: false
  }

  public changeForm = () => {
    this.setState({
      isRegister: !this.state.isRegister
    })
  }

  public onChange = (name: string, value: string) => {
    const formControls = {...this.state.formControls}
    formControls[name].value = value
    formControls[name].touched = true

    formControls[name] = this.validationControl(formControls[name]);
    this.setState({...this.state, formControls})
  }

  public renderInputs = (classInput: string) => {
    const formControls = this.state.formControls

    return Object.keys(formControls).map((key: string, index: number) => {
      const formControl = formControls[key];
      const input = (
        <Input type={formControl.type}
               label={formControl.label}
               name={key} value={formControl.value}
               hasError={formControl.hasError}
               errorMessage={formControl.errorMessage}
               change={(event) => this.onChange(key, event.target.value)}
        />
      )
      return (
        <React.Fragment key={index + '__' + key}>
          <div className={classInput}>
            {!this.state.isRegister && key === 'passwordConfirm' ? null : input}
          </div>
        </React.Fragment>
      )
    })
  }

  public validationControl(control: IControl): IControl {
    const controlCloned: IControl = {...control}
    let isValid: boolean = true

    if (controlCloned.validators.required && Validators.isRequired(controlCloned.value) && isValid) {
      isValid = false
      return Validation.setValidationControl(controlCloned, true, ERROR_REQUIRED)
    }

    if (controlCloned.validators.email && Validators.isEmail(controlCloned.value) && isValid) {
      isValid = false
      return Validation.setValidationControl(controlCloned, true, ERROR_EMAIL)
    }

    if (controlCloned.validators.minLength && Validators.isMinLength(controlCloned.value, controlCloned.validators.minLength) && isValid) {
      isValid = false
      return Validation.setValidationControl(controlCloned, true, ERROR_PASSWORD)
    }

    const conformingPassword :IControl = this.state.formControls[controlCloned.validators.confirm]
    if (controlCloned.validators.confirm && Validators.isConfirm(controlCloned.value, conformingPassword.value) && isValid) {
      return Validation.setValidationControl(controlCloned, true, ERROR_PASSWORD_CONFIRM)
    }

    return Validation.setValidationControl(controlCloned)
  }

  public render(): React.ReactNode {
    return (
      <Grid container={true} alignItems={'center'} justify={'center'} className={classes.root}>
        <Grid item={true} xs={3}>
          <Card className={classes.cardFix}>
            <AppBar color="primary" position="static" className={classes.disableShadow}>
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  {this.state.isRegister ? 'Реєстрація' : 'Вхід'}
                </Typography>
              </Toolbar>
            </AppBar>
            <CardContent>
              <UserForm isRegister={this.state.isRegister}
                        changeForm={this.changeForm}
                        inputs={this.renderInputs}
                        disabled={this.state.hasError}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default unauthorized
