import * as React from 'react'
import {styles, IStyles} from './styles'
import Button from '@material-ui/core/Button/Button'
import RenderInputs from '../renderInputs/renderInputs';
import {IFormControl} from '../../validation/interfaces/validation';
import withStyles from "@material-ui/core/styles/withStyles";

interface IProps {
  formChangeHandler: (event: React.FormEvent<HTMLFormElement>) => void
  formControls: IFormControl
  inputChange: (name: string, value: string) => void
  changeForm: () => void
  changeLabel: string
  submitLabel: string
  disabled?: boolean
  loading?: boolean
  classes?: IStyles
}

const userForm = function UserForm(props: IProps) {
  const {classes} = props
  return (
    <>
      <form onSubmit={(event) => props.formChangeHandler(event)}>
        <RenderInputs formControls={props.formControls} change={props.inputChange}/>
        <div className={classes.submitBtn}>
          <Button type="button" variant="contained" color="primary" onClick={props.changeForm}>{props.changeLabel}</Button>
          <Button type="submit" disabled={props.disabled || props.loading} variant="contained" color="secondary" style={{color: '#fff'}}>
            {props.submitLabel} {props.loading ? '...' : null}
          </Button>
        </div>
      </form>
    </>
  )
}

export default withStyles(styles)(userForm)
