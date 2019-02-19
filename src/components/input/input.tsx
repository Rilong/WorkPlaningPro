import FormControl from '@material-ui/core/FormControl/FormControl'
import * as React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText'
import {TextField} from '@material-ui/core'

interface IProps {
  value: string
  type: string
  label: string
  name: string
  hasError?: boolean
  errorMessage?: string
  change?: (e: any) => void,
  className?: string
  variant?: 'standard' | 'outlined' | 'filled'
}

export default (props: IProps) => {
  const errorId = `${props.name}__error`
  return (
    <FormControl fullWidth={true} error={props.hasError} aria-describedby={errorId} className={props.className}>
      <TextField id={props.name}
                 type={props.type}
                 value={props.value}
                 onChange={props.change}
                 label={props.label}
                 variant={typeof props.variant === 'undefined' ? 'standard' : props.variant as any}/>
      {props.hasError ? <FormHelperText id={errorId}>{props.errorMessage}</FormHelperText> : null}
    </FormControl>
  )
}
