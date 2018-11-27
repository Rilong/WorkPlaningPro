import {ButtonProps} from '@material-ui/core/Button'
import Button from '@material-ui/core/Button/Button'
import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import classes from './styles.css'

interface IProps extends ButtonProps {
  loading?: boolean
}

export default (props: IProps) => (
  <Button {...props} disabled={props.disabled || props.loading}>
    {props.children}
    {props.loading ? <CircularProgress className={classes.progress} color="inherit" /> : null}
    </Button>
);