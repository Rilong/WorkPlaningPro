import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import File from '../../file/File'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

class FileList extends React.Component {
  public constructor(props) {
    super(props)
  }
  public render() {
    return (
      <>
        <Typography variant="h6" align="center" className="pj-mb">Прикрепления файлов</Typography>
        <div className="files pj-mb">
          <File link="#"
                download={'file.jpg'}
                onRemove={() => null}>File name 1</File>
          <File link="#"
                download={'file.jpg'}
                onRemove={() => null}>File name 2</File>
          <File link="#"
                download={'file.jpg'}
                onRemove={() => null}>File name 3</File>
        </div>
        <Fab variant="extended"
             size="small"
             color="primary"
             className="pjUploadBtn">
          <CloudUploadIcon className="pjUploadBtnIcon"/> Загрузить файл
        </Fab>
      </>
    )
  }
}

export default FileList