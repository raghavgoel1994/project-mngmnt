import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import URL from 'constants/urls';
import {
  GET_PROJECT_COLLECTION,
  GET_PROJECT_COLLECTION_SUCCESS,
  GET_PROJECT_COLLECTION_FAILURE,
  GET_PROJECT_LIST,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILURE,
  CREATE_PROJECT,
} from './constants';

function* getProjectCollection({}) {
  try {
    const promiseRequest = yield call(request, URL.getProjectCollection, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
      includeTokens: true,
    });
    const response = yield promiseRequest;
    yield put({
      type: GET_PROJECT_COLLECTION_SUCCESS,
      payload: response,
    });
    yield put({
      type: GET_PROJECT_LIST,
    });
  } catch (e) {
    yield put({
      type: GET_PROJECT_COLLECTION_FAILURE,
      payload: { error: true },
    });
    console.debug(e);
  }
}

function* getProjectList({}) {
  try {
    const promiseRequest = yield call(request, URL.getProjectList, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
      includeTokens: true,
    });
    const response = yield promiseRequest;
    yield put({
      type: GET_PROJECT_LIST_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: GET_PROJECT_LIST_FAILURE,
      payload: { error: true },
    });
    console.debug(e);
  }
}

function* createProject({ payload }) {
  try {
    const promiseRequest = yield call(request, URL.setProject, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
      includeTokens: true,
      body: payload,
    });
    const response = yield promiseRequest;
    yield put({
      type: GET_PROJECT_LIST_SUCCESS,
      payload: response,
    });
  } catch (e) {
    yield put({
      type: GET_PROJECT_LIST_FAILURE,
      payload: { error: true },
    });
    console.debug(e);
  }
}

export default function* watcher() {
  yield takeLatest(GET_PROJECT_COLLECTION, getProjectCollection);
  yield takeLatest(GET_PROJECT_LIST, getProjectList);
  yield takeLatest(CREATE_PROJECT, createProject);
}
