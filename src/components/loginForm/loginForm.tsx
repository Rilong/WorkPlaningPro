import * as React from 'react'
import {StyleRulesCallback, withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl/FormControl'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Input from '@material-ui/core/Input/Input'
import Button from '@material-ui/core/Button/Button'

interface IProps {
  classes?: {
    input: string,
    submitBtn: string
  }
}

const styles: StyleRulesCallback = theme => ({
  submitBtn: {
    marginTop: 10,
      display: 'flex',
      justifyContent: 'flex-end'
  },
  input: {
    marginBottom: 10
  }
})

const loginForm = function LoginForm({classes} : IProps) {
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
        <div className={classes.submitBtn}>
          <Button type="submit" variant="contained" color="primary">Увійти</Button>
        </div>
      </form>
    </>
  )
}

export default withStyles(styles)(loginForm)
