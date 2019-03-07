import React from 'react'
import './styles.scss'

type alignType = 'left' | 'center' | 'right'

interface IProps {
  align: alignType
  children?: React.ReactNode
}

const Align: React.FunctionComponent<IProps> = (props: IProps) => {
  let alignClassName = ''

  switch (props.align) {
    case 'left':
      alignClassName = 'AlignLeft'
      break
    case 'center':
      alignClassName = 'AlignCenter'
      break
    case 'right':
      alignClassName = 'AlignRight'
      break
  }

  return (
    <>
      <div className={alignClassName}>{props.children}</div>
    </>
  )
}

Align.defaultProps = {
  align: 'left'
}

export default Align