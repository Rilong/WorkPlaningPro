import firebase from 'firebase/app'
import 'firebase/database'
import {Dispatch} from 'redux'
import * as _ from 'lodash'
import {CREATE_PROJECT_END_LOADING, CREATE_PROJECT_START_LOADING} from './actionTypes'
import {openMessage} from '../message/actions'
import {Project} from '../../../models/Project'
import {addProject, editProjectDeadlinesInList, editProjectNameInList} from '../project-list/actions'

export const createProject = (projectName: string, userId: string) => async (dispatch: Dispatch) => {
  const newProject = new Project(null, userId, projectName, new Date().getTime())
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

export const changeProjectName = (name: string, id: string) => async (dispatch: Dispatch) => {
  const project: Project = {...dispatch<any>(getProjectById(id))}
  const projectIndex: number = dispatch<any>(getProjectIndexById(id))

  project.name = name

  try {
    await updateProjectById(project, id)
    dispatch(editProjectNameInList(name, projectIndex))
    return Promise.resolve()
  } catch (e) {
    dispatch(openMessage('Error', 'danger'))
    return Promise.reject()
  }
}

export const setProjectDeadlines = (start: Date, finish: Date, id: string) => async (dispatch: Dispatch): Promise<void> => {
  const project: Project = {...dispatch<any>(getProjectById(id))}
  const projectIndex: number = dispatch<any>(getProjectIndexById(id))

  if (start !== null) {
    project.startDate = start.getTime()
  }

  if (finish !== null) {
    project.finishDate = finish.getTime()
  }

  try {
    await updateProjectById(project, id)
    dispatch(editProjectDeadlinesInList(project.startDate, project.finishDate, projectIndex))
    return Promise.resolve()
  } catch (e) {
    dispatch(openMessage('Error', 'danger'))
    return Promise.reject()
  }
}

export const getProjectById = (id: string) => (dispatch: Dispatch, getState): Project => {
  return _.find<Project>(getState().ProjectListReducer.projects, {id})
}

export const getProjectIndexById = (id: string) => (dispatch: Dispatch, getState) => {
    return _.findIndex(getState().ProjectListReducer.projects, {id})
}

const updateProjectById = (project: Project, id: string): Promise<void> => {
  console.log('updateProjectById', project, id)
  return firebase.database().ref(`projects/${id}`).set(project)
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