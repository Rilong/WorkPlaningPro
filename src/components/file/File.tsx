import * as React from 'react'
import './styles.scss'

interface IProps {
  link: string
  download: boolean,
  children: React.ReactNode
}

const File:React.FunctionComponent<IProps> = ({ link, download, children }: IProps) => (
  <div className="file">
    {children}
  </div>
)

File.defaultProps = {
  download: false
}

export default File