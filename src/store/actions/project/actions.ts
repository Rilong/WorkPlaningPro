import firebase from 'firebase/app'
import 'firebase/database'
import {Dispatch} from 'redux'
import {
  CREATE_PROJECT_END_LOADING,
  CREATE_PROJECT_START_LOADING
} from './actionTypes'
import {openMessage} from '../message/actions'
import {Project} from '../../../models/Project'
import {addProject} from '../project-list/actions'

export const createProject = (projectName: string, userId: string) => async (dispatch: Dispatch) => {
  const newProject = new Project(null, userId, projectName, new Date())
  dispatch(createProjectStartLoading())

  try {
    const project = await firebase.database().ref('projects').push(newProject)
    dispatch(createProjectEndLoading())
    dispatch(openMessage('Проект создан', 'success'))
    dispatch(addProject({...newProject, id: project.key}))

    return Promise.resolve()
  } catch (e) {
    console.log(e)
    return Promise.reject()
  }
}

const createProjectStartLoading = () => {
  return {
    type: CREATE_PROJECT_START_LOADING
  }
}

const createProjectEndLoading = () => {
  return {
    type: CREATE_PROJECT_END_LOADING
  }
}