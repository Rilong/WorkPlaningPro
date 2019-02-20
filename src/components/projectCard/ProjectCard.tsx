import * as React from 'react'
import {IProject} from '../../interfaces/projects/IProject'
import {Card, Typography} from '@material-ui/core'
interface IProps {
  data: IProject
}

const ProjectCard = (props: IProps) => (
  <Card style={{marginBottom: '20px', padding: '15px'}}>
    <Typography>{props.data.name}</Typography>
  </Card>
)

export default ProjectCard