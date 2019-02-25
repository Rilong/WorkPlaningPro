import React from 'react'
import {Typography} from '@material-ui/core'
import {match, withRouter} from 'react-router'

interface IParams {
  id: string
}

interface IProps {
  match?: match<IParams>
}

class Project extends React.Component<IProps> {

  public render(): React.ReactNode {
    return (
      <div>
        <Typography variant="h2">Project page - {this.props.match.params.id}</Typography>
      </div>
    )
  }

}

export default withRouter<any>(Project)