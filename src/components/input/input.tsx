import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Input from '@material-ui/core/Input/Input';
import FormControl from '@material-ui/core/FormControl/FormControl';
import * as React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';

interface IProps {
  value: string
  type: string
  label: string
  name: string
  hasError?: boolean
  errorMessage?: string
}

export default (props: IProps) => {
  const errorId = `${props.name}__error`

  return (
    <FormControl fullWidth={true} error={props.hasError} aria-describedby={errorId}>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <Input id={props.name} type={props.type} value={props.value}/>
      {props.hasError ? <FormHelperText id={errorId}>{props.errorMessage}</FormHelperText> : null}
    </FormControl>
  );
}
