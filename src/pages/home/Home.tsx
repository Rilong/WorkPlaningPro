import * as React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import ProjectCard from '../../components/projectCard/ProjectCard'

import './styles.scss'
import {IProject} from '../../interfaces/projects/IProject'
import {GridSpacing} from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import CreationProject from '../../components/creationProject/CreationProject'
import TextEditor from '../../components/textEditor/TextEditor'
import TextEditorModel from '../../models/TextEditor'

interface IProps {
  createProjectOpen: boolean
  projects?: IProject[]
}


class Home extends React.Component<IProps> {

  private projectsList() {
    return (
      <div style={{padding: '30px'}}>
        <Grid container={true} style={{marginTop: '20px'}} spacing={24 as GridSpacing}>
          {this.props.projects.map((project: IProject, index: number) => (
            <Grid item={true} xs={3} key={project.id}>
              <Link to={`/project/${project.id}`} style={{textDecoration: 'none'}}>
                <ProjectCard data={project}/>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    )

  }

  public render() {
    return (
      <div>
        <CreationProject/>
        {this.projectsList()}
        <div style={{padding: '10px', width: '600px'}}>
          <TextEditor onChange={(model: TextEditorModel) => console.log(model)} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    projects: state.ProjectListReducer.projects
  }
}

export default connect(mapStateToProps)(Home)