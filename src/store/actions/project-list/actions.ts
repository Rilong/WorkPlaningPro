import firebase from 'firebase/app'
import 'firebase/database'

import {IAction} from '../../../interfaces/IAction'
import {PROJECTS_ADD, PROJECTS_GET, PROJECTS_LOADING_END, PROJECTS_LOADING_START} from './actionTypes'
import {Dispatch} from 'redux'
import {IProject} from '../../../interfaces/projects/IProject'
import {Project} from '../../../models/Project'
import {openMessage} from '../message/actions'
import {ERROR_UNKNOWN} from '../../../validation/validationMessages'

export const getProjects = (userId: string) => async (dispatch: Dispatch) => {
  const projects: IProject[] = []

  try {
    dispatch(projectLoadingStart())
    const projectValue = await firebase.database().ref('projects')
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
    dispatch(projectLoadingEnd())

    const tmpProjects: IProject = projectValue.val()

    if (tmpProjects !== null) {
      Object.keys(tmpProjects).forEach(key => {
        const id = key
        const userIdVal = tmpProjects[key].userId
        const name = tmpProjects[key].name
        const startDate = typeof tmpProjects[key].startDate === 'undefined' ? null : tmpProjects[key].startDate
        const finishDate = typeof tmpProjects[key].finishDate === 'undefined' ? null : tmpProjects[key].finishDate
        const price = typeof tmpProjects[key].price === 'undefined' ? 0 : tmpProjects[key].price
        const tasks = typeof tmpProjects[key].tasks === 'undefined' ? null : tmpProjects[key].tasks
        const notes = typeof tmpProjects[key].notes === 'undefined' ? null : tmpProjects[key].notes
        const attachmentFiles = typeof tmpProjects[key].attachmentFiles === 'undefined' ? null : tmpProjects[key].attachmentFiles

        projects.push(new Project(id, userIdVal, name, startDate, finishDate, tasks, notes, price, attachmentFiles))
        console.log(projects)
      })

      dispatch(setProjectList(projects))
    }
  } catch (e) {
    console.log(e)
    dispatch(projectLoadingEnd())
    dispatch(openMessage(ERROR_UNKNOWN))
  }
}

export const addProject = (project: IProject): IAction => {
  return {
    type: PROJECTS_ADD,
    payload: project
  }
}

const setProjectList = (list: IProject[]): IAction => {
  return {
    type: PROJECTS_GET,
    payload: list
  }
}
const projectLoadingStart = (): IAction => {
  return {
    type: PROJECTS_LOADING_START
  }
}

const projectLoadingEnd = (): IAction => {
  return {
    type: PROJECTS_LOADING_END
  }
}