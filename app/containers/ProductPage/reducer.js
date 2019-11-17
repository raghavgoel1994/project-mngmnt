/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import {
  GET_PROJECT_COLLECTION,
  GET_PROJECT_COLLECTION_FAILURE,
  GET_PROJECT_COLLECTION_SUCCESS,
  GET_PROJECT_LIST,
  GET_PROJECT_LIST_FAILURE,
  GET_PROJECT_LIST_SUCCESS,
} from './constants';

export const initialState = {
  isFetching: false,
  isError: false,
  projectCollection: {},
  projectList: {},
};

/* eslint-disable default-case, no-param-reassign */
const ProductProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROJECT_COLLECTION:
        draft.isFetching = true;
        break;
      case GET_PROJECT_COLLECTION_SUCCESS:
        draft.isFetching = false;
        draft.projectCollection = action.payload;
        break;
      case GET_PROJECT_COLLECTION_FAILURE:
        draft.isFetching = false;
        draft.isError = true;
        break;
      case GET_PROJECT_LIST:
        draft.isFetching = true;
        break;
      case GET_PROJECT_LIST_SUCCESS:
        draft.isFetching = false;
        draft.projectList = action.payload;
        break;
      case GET_PROJECT_LIST_FAILURE:
        draft.isFetching = false;
        draft.isError = true;
        break;
    }
  });

export default ProductProviderReducer;
