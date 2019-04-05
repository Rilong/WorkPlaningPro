export default interface IDialog {
  open: boolean
  disabled?: boolean
  loading?: boolean
  action?: string
  value?: string
}