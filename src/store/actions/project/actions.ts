import firebase from '../../../firebase'
import 'firebase/database'
import {Dispatch} from 'redux';
import {
  CREATE_PROJECT_END_LOADING,
  CREATE_PROJECT_START_LOADING
} from './actionTypes';
import {openMessage} from "../message/actions";

export const createProject = (projectName: string) => async (dispatch: Dispatch) => {
  const newProject = {
    name: projectName,
    startDate: new Date(),
    finishDate: null,
    price: 0,
    tasks: null,
    notes: null,
    attachmentFiles: null,
  }
  dispatch(createProjectStartLoading())

  try {
    await firebase.database().ref('projects').push(newProject)
    createProjectEndLoading()
    dispatch(openMessage('Проект создан'))
     return Promise.resolve()
  } catch (e) {
    console.log(e);
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