import {IAction} from '../../interfaces/IAction'
import {IProjectState} from '../../interfaces/projects/IProjectState'

const initialState: IProjectState = {
  name: null,
  startDate: null,
  finishDate: null,
  price: 0,
  tasks: null,
  notes: null,
  attachmentFiles: null,
  loading: false
}

export default function (state: IProjectState = initialState, action: IAction): IProjectState {
  switch (action.type) {
    default:
      return state
  }
}