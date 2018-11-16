import * as React from 'react'
import * as classes from './styles.css'
import Button from '@material-ui/core/Button/Button'

interface IProps {
  isRegister: boolean
  changeForm: () => void
  inputs: (classInput: string) => React.ReactNode
}

const userForm = function UserForm(props: IProps) {
  return (
    <>
      <form>
        {props.inputs(classes.input)}
        <div className={classes.submitBtn}>
          <Button type="button" variant="contained" color="primary" onClick={props.changeForm}>{!props.isRegister ? 'Реєстрація' : 'Вхід'}</Button>
          <Button type="submit" variant="contained" color="secondary" style={{color: '#fff'}}>{props.isRegister ? 'Зареєструватись' : 'Увійти'}</Button>
        </div>
      </form>
    </>
  )
}

export default userForm
