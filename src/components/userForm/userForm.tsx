import * as React from 'react'
import * as classes from './styles.css'
import FormControl from '@material-ui/core/FormControl/FormControl'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Input from '@material-ui/core/Input/Input'
import Button from '@material-ui/core/Button/Button'

interface IProps {
  isRegister: boolean
}

const userForm = function UserForm(props: IProps) {
  return (
    <>
      <form>
        <div className={classes.input}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input id="email"/>
          </FormControl>
        </div>
        <div className={classes.input}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <Input id="password"/>
          </FormControl>
        </div>
        {props.isRegister ?
          <div className={classes.input}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="repeatPassword">Повторить пароль</InputLabel>
              <Input id="repeatPassword"/>
            </FormControl>
          </div>
          : null
        }
        <div className={classes.submitBtn}>
          <Button type="button" variant="contained" color="secondary" style={{color: '#fff'}}>{!props.isRegister ? 'Регистрація' : 'Вхід'}</Button>
          <Button type="submit" variant="contained" color="primary">{props.isRegister ? 'Зареєструватись' : 'Увійти'}</Button>
        </div>
      </form>
    </>
  )
}

export default userForm
