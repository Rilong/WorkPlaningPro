import firebase from 'firebase/app'
import 'firebase/database'

import {IAction} from '../../../interfaces/IAction'
import {PROJECTS_ADD, PROJECTS_GET, PROJECTS_LOADING_END, PROJECTS_LOADING_START} from './actionTypes'
import {Dispatch} from 'redux'
import {IProject} from '../../../interfaces/projects/IProject'
import {Project} from '../../../models/Project'
import {openMessage} from '../message/actions'
import {ERROR_UNKNOWN} from '../../../validation/validationMessages'

export const getProjects = () => async (dispatch: Dispatch) => {
  const projects: IProject[] = []

  try {
    dispatch(projectLoadingStart())
    const projectValue = await firebase.database().ref('projects').once('value')
    dispatch(projectLoadingEnd())

    const tmpProjects: IProject = projectValue.val()

    if (tmpProjects !== null) {
      Object.keys(tmpProjects).forEach(key => {
        const id = key
        const name = tmpProjects[key].name
        const startDate = typeof tmpProjects.startDate === 'undefined' ? null : tmpProjects.startDate
        const finishDate = typeof tmpProjects.finishDate === 'undefined' ? null : tmpProjects.finishDate
        const price = typeof tmpProjects.price === 'undefined' ? 0 : tmpProjects.price
        const tasks = typeof tmpProjects.tasks === 'undefined' ? null : tmpProjects.tasks
        const notes = typeof tmpProjects.notes === 'undefined' ? null : tmpProjects.notes
        const attachmentFiles = typeof tmpProjects.attachmentFiles === 'undefined' ? null : tmpProjects.attachmentFiles

        projects.push(new Project(id, name, startDate, finishDate, tasks, notes, price, attachmentFiles))
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