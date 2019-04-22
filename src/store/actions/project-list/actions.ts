import firebase from 'firebase/app'
import 'firebase/database'

import {IAction} from '../../../interfaces/IAction'
import {
  EDIT_PROJECT_BUDGET_IN_LIST,
  EDIT_PROJECT_DEADLINES_IN_LIST,
  EDIT_PROJECT_NAME_IN_LIST,
  PROJECTS_ADD,
  PROJECTS_GET,
  PROJECTS_LOADED,
  PROJECTS_LOADING_END,
  PROJECTS_LOADING_START,
  PROJECTS_UNLOADED, UPDATE_TASKS_IN_PROJECT
} from './actionTypes'
import {Dispatch} from 'redux'
import {IProject} from '../../../interfaces/projects/IProject'
import {Project} from '../../../models/Project'
import {openMessage} from '../message/actions'
import {ERROR_UNKNOWN} from '../../../validation/validationMessages'
import Task from '../../../models/Task'

export const getProjects = (userId: string) => async (dispatch: Dispatch) => {
  const projects: IProject[] = []

  try {
    dispatch(projectLoadingStart())
    dispatch(projectUnloaded())
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
        const price = typeof tmpProjects[key].budget === 'undefined' ? 0 : tmpProjects[key].budget
        let tasks = typeof tmpProjects[key].tasks === 'undefined' ? [] : tmpProjects[key].tasks
        const notes = typeof tmpProjects[key].notes === 'undefined' ? [] : tmpProjects[key].notes
        const attachmentFiles = typeof tmpProjects[key].attachmentFiles === 'undefined' ? null : tmpProjects[key].attachmentFiles

        if (tasks.length > 0) {
          tasks = tasks.map(task => {
            return new Task(task.name, task.deadline, task.tasks, task.done, task.saved)
          })
        }

        projects.push(new Project(id, userIdVal, name, startDate, finishDate, tasks, notes, price, attachmentFiles))
      })

      dispatch(setProjectList(projects))
      dispatch(projectLoaded())
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

export const editProjectNameInList = (name: string, index: number): IAction => {
  return {
    type: EDIT_PROJECT_NAME_IN_LIST,
    payload: {index, name}
  }
}

export const editProjectDeadlinesInList = (start: number, finish: number, index: number): IAction => {
  return {
    type: EDIT_PROJECT_DEADLINES_IN_LIST,
    payload: {index, start, finish}
  }
}

export const editProjectBudgetInList = (budget: number, index: number): IAction => {
  return {
    type: EDIT_PROJECT_BUDGET_IN_LIST,
    payload: {budget, index}
  }
}

export const updateTasksInProject = (tasks: Task[], index: number): IAction => {
  return {
    type: UPDATE_TASKS_IN_PROJECT,
    payload: {tasks, index}
  }
}

export const setProjectList = (list: IProject[]): IAction => {
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

const projectLoaded = (): IAction => {
  return {
    type: PROJECTS_LOADED
  }
}

const projectUnloaded = (): IAction => {
  return {
    type: PROJECTS_UNLOADED
  }
}