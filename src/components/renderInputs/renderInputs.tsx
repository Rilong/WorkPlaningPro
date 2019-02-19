import * as React from 'react'
import {IFormControl} from '../../validation/interfaces/validation'
import Input from '../input/input'

import './styles.scss' 


interface IProps {
  formControls: IFormControl,
  change: (key: string, value: string) => void
}

const renderInputs = (props: IProps) => {
  return (
    <>
      {Object.keys(props.formControls).map((key, index) => {
        return <div className="renderInputsInput" key={index + '__' + key}>
          <Input type={props.formControls[key].type}
                       label={props.formControls[key].label}
                       name={key} value={props.formControls[key].value}
                       hasError={props.formControls[key].hasError}
                       errorMessage={props.formControls[key].errorMessage}
                       change={(event) => props.change(key, event.target.value)}
                       key={key}
        />
        </div>
      })}
    </>
  )
}

export default renderInputs