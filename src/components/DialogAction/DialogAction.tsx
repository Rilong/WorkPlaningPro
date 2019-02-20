import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import * as React from 'react'
import ExtendedButton from '../extendedButton/ExtendedButton'

interface IProps {
  open: boolean
  onEntered?: () => void
  onClose: () => void
  onAgree?: () => void
  onDisagree?: () => void
  disagreeLabel?: string
  agreeLabel?: string
  disabled?: boolean
  loading?: boolean
  title: string
  children: any
}

const DialogAction = (props: IProps) => (
  <Dialog
    open={props.open}
    onEntered={props.onEntered}
    onClose={props.onClose}
    fullWidth={true}
  >
    <DialogTitle style={{textAlign: 'center'}}>{props.title}</DialogTitle>
    <DialogContent>{props.children}</DialogContent>
    <DialogActions>
      <Button onClick={props.onDisagree} color="primary">
        {typeof props.disagreeLabel === 'undefined' ? 'Отменить' : props.disagreeLabel}
      </Button>
      <ExtendedButton onClick={props.onAgree}
              color="primary"
              disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
              autoFocus={true}
              loading={props.loading}>
        {typeof props.agreeLabel === 'undefined' ? 'Прийнять' : props.agreeLabel}
      </ExtendedButton>
    </DialogActions>
  </Dialog>
)

export default DialogAction