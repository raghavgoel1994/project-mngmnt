import {
  GET_PROJECT_COLLECTION,
  GET_PROJECT_LIST,
  CREATE_PROJECT,
} from './constants';

export function getProjectCollection() {
  return {
    type: GET_PROJECT_COLLECTION,
  };
}

export function getProjectList() {
  return {
    type: GET_PROJECT_LIST,
  };
}

export function CreateProject(payload) {
  return {
    type: CREATE_PROJECT,
    payload,
  };
}
