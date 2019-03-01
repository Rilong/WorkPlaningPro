import * as React from 'react'
import {Button} from '@material-ui/core'
import {ButtonProps} from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import './styles.css'
import {FunctionComponent} from 'react'

export interface IExtendedButton extends ButtonProps {
  loading?: boolean
}

const ExtendedButton: FunctionComponent<IExtendedButton> = (props: IExtendedButton) => {
  const clonedProps: IExtendedButton = {...props}
  let classes = 'ext-btn'

  if (props.loading) {
    classes += ' ext-btn-loader-active'
  }

  delete clonedProps.loading

  return (
    <Button {...clonedProps} className={classes}>
      <span className="ext-btn-text">{props.children}</span>
      <span className="ext-btn-loader">
        <CircularProgress size={20} classes={{colorPrimary: 'ext-btn-loader-color'}}/>
      </span>
    </Button>
  )
}

ExtendedButton.defaultProps = {
  loading: false
}

export default ExtendedButton