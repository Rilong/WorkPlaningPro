import firebase from 'firebase/app'
import 'firebase/database'
import {Dispatch} from 'redux'
import * as _ from 'lodash'
import {CREATE_PROJECT_END_LOADING, CREATE_PROJECT_START_LOADING} from './actionTypes'
import {openMessage} from '../message/actions'
import {Project} from '../../../models/Project'
// @ts-ignore
import {
  updateTasksInProject,
  addProject,
  editProjectBudgetInList,
  editProjectDeadlinesInList,
  editProjectNameInList, addNoteInProjectList, removeNoteInProjectList
} from '../project-list/actions'
import {ERROR_UNKNOWN} from '../../../validation/validationMessages'
import TaskModel from '../../../models/Task'
import Note from '../../../models/Note'

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
  const project: Project = dispatch<any>(getProjectById(id))
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
    dispatch(openMessage(ERROR_UNKNOWN, 'danger'))
    return Promise.reject(e)
  }
}

export const setProjectBudget = (budget: number, id: string) => async (dispatch: Dispatch): Promise<void> =>{
  const project: Project = dispatch<any>(getProjectById(id))
  const projectIndex: number = dispatch<any>(getProjectIndexById(id))

  project.budget = budget

  try {
    await updateProjectById(project, id)
    dispatch(editProjectBudgetInList(budget, projectIndex))
    return Promise.resolve()
  } catch (e) {
    dispatch(openMessage(ERROR_UNKNOWN, 'danger'))
    return Promise.reject(e)
  }
}

export const saveTaskInProject = (id: string, task: TaskModel, parentIndex: number = null, subIndex: number = null) => async (dispatch: Dispatch) : Promise<void> => {
  const project: Project = dispatch<any>(getProjectById(id))
  const projectIndex: number = dispatch<any>(getProjectIndexById(id))

  task.loading = false
  task.saved = true

  if (subIndex === null) {
    if (typeof project.tasks[parentIndex] === 'undefined') {
      project.tasks.push(task)
    } else {
      project.tasks[parentIndex] = task
    }
  } else {
    if (typeof project.tasks[parentIndex].tasks[subIndex] === 'undefined') {
      project.tasks[parentIndex].tasks.push(task)
    } else {
      project.tasks[parentIndex].tasks[subIndex] = task
    }
  }

  try {
      await updateProjectById(project, id)
      dispatch(updateTasksInProject(project.tasks, projectIndex))
      return Promise.resolve()
    } catch (e) {
      dispatch(openMessage(ERROR_UNKNOWN))
      return Promise.reject()
    }
}

export const removeTaskInProject = (id: string, parentIndex: number, subIndex: number = null) => async (dispatch: Dispatch) : Promise<void> => {
  const project: Project = dispatch<any>(getProjectById(id))
  const projectIndex: number = dispatch<any>(getProjectIndexById(id))

  if (subIndex === null) {
    project.tasks.splice(parentIndex, 1)
  } else {
    project.tasks[parentIndex].tasks.splice(subIndex, 1)
  }
  try {
    await updateProjectById(project, id)
    dispatch(updateTasksInProject(project.tasks, projectIndex))
    return Promise.resolve()
  } catch (e) {
    dispatch(openMessage(ERROR_UNKNOWN))
    return Promise.reject()
  }
}

export const addNoteInProject = (content: string, projectId: string) => async (dispatch: Dispatch): Promise<void> => {
  const project: Project = dispatch<any>(getProjectById(projectId))
  const projectIndex: number = dispatch<any>(getProjectIndexById(projectId))
  const note: Note = new Note(content)
  const notes: Note[] = [...project.notes]
  notes.push(note)
  project.notes = notes

  try {
    await updateProjectById(project, projectId)
    dispatch(addNoteInProjectList(note, projectIndex))
    return Promise.resolve()
  } catch (e) {
    dispatch(openMessage(ERROR_UNKNOWN, 'danger'))
    return Promise.reject()
  }
}

export const removeNoteInProject = (index: number, projectId: string) => async (dispatch: Dispatch): Promise<void> => {
  const project: Project = dispatch<any>(getProjectById(projectId))
  const projectIndex: number = dispatch<any>(getProjectIndexById(projectId))
  const notes: Note[] = [...project.notes]

  notes.splice(index, 1)

  project.notes = notes

  try {
    await updateProjectById(project, projectId)
    dispatch(removeNoteInProjectList(index, projectIndex))
    return Promise.resolve()
  } catch (e) {
    dispatch(openMessage(ERROR_UNKNOWN, 'danger'))
    return Promise.reject()
  }
}

export const getProjectById = (id: string) => (dispatch: Dispatch, getState): Project => {
  return _.clone<Project>(_.find<Project>(getState().ProjectListReducer.projects, {id}))
}

export const getProjectIndexById = (id: string) => (dispatch: Dispatch, getState) => {
    return _.findIndex(getState().ProjectListReducer.projects, {id})
}

const updateProjectById = (project: Project, id: string): Promise<void> => {
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