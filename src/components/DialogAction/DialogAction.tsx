import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import * as React from "react";

interface IProps {
  open: boolean
  onClose: () => void
  onAgree?: () => void
  onDisagree?: () => void
  disagreeLabel?: string
  agreeLabel?: string
  title: string
  children: any
}

const DialogAction = (props: IProps) => (
  <Dialog
    open={props.open}
    onClose={props.onClose}
    fullWidth={true}
  >
    <DialogTitle style={{textAlign: 'center'}}>{props.title}</DialogTitle>
    <DialogContent>{props.children}</DialogContent>
    <DialogActions>
      <Button onClick={props.onDisagree} color="primary">
        {typeof props.disagreeLabel === 'undefined' ? 'Отменить' : props.disagreeLabel}
      </Button>
      <Button onClick={props.onAgree} color="primary" autoFocus={true}>
        {typeof props.agreeLabel === 'undefined' ? 'Прийнять' : props.agreeLabel}
      </Button>
    </DialogActions>
  </Dialog>
)

export default DialogAction