import * as React from 'react'
import * as classes from './styles.css'
import Button from '@material-ui/core/Button/Button'
import RenderInputs from '../renderInputs/renderInputs';
import {IFormControl} from '../../validation/interfaces/validation';

interface IProps {
  formChangeHandler: (event: React.FormEvent<HTMLFormElement>) => void
  formControls: IFormControl
  inputChange: (name: string, value: string) => void
  changeForm: () => void
  changeLabel: string
  submitLabel: string
  disabled?: boolean
}

const userForm = function UserForm(props: IProps) {
  return (
    <>
      <form onSubmit={(event) => props.formChangeHandler(event)}>
        <RenderInputs formControls={props.formControls} change={props.inputChange}/>
        <div className={classes.submitBtn}>
          <Button type="button" variant="contained" color="primary" onClick={props.changeForm}>{props.changeLabel}</Button>
          <Button type="submit" disabled={props.disabled} variant="contained" color="secondary" style={{color: '#fff'}}>{props.submitLabel}</Button>
        </div>
      </form>
    </>
  )
}

export default userForm
