import * as React from 'react'
import './styles.scss'
import {Paper, Typography, Fab} from '@material-ui/core'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import CloseIcon from '@material-ui/icons/Close'


interface IProps {
  link: string
  children: React.ReactNode
  onRemove: () => void
  download?: any
}

const File:React.FunctionComponent<IProps> = ({ link, download, onRemove, children }: IProps) => {

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onRemove()
  }

  return (
    <div className="file">
      <a href={link} download={download}>
        <Paper className="file-paper">
          <Typography variant="body1" className="file-text">
            <InsertDriveFileIcon/>
            <span className="text">{children}</span>
            <Fab size="small" color="primary" onClick={clickHandler}><CloseIcon/></Fab>
          </Typography>
        </Paper>
      </a>
    </div>
  )
}

File.defaultProps = {
  download: false
}

export default File