import * as React from 'react'
import {Typography} from '@material-ui/core'
import './styles.scss'

type sides = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

interface IProps {
  children: string
  side?: sides
}

const Watermark: React.FunctionComponent<IProps> = (props: IProps) => {
  const classes = `watermark ${props.side}`
  return (
    <div className={classes}>
      <Typography className="text">{props.children}</Typography>
    </div>
  )
}

Watermark.defaultProps = {
  side: 'topLeft'
}

export default Watermark