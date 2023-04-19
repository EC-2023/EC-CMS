import {
  ADD_USER_LEVEL,
  DELETE_USER_LEVEL,
  FETCH_USER_LEVELS_FAILURE,
  FETCH_USER_LEVELS_REQUEST,
  FETCH_USER_LEVELS_SUCCESS,
  FETCH_USER_LEVELS,
  UPDATE_USER_LEVEL,
} from './actionType';

export const fetchUserLevelsRequest = () => ({
  type: FETCH_USER_LEVELS_REQUEST,
});

export const fetchUserLevelsSuccess = (userLevels, totalPages) => ({
  type: FETCH_USER_LEVELS_SUCCESS,
  payload: { userLevels, totalPages },
});

export const fetchUserLevelsFailure = (error) => ({
  type: FETCH_USER_LEVELS_FAILURE,
  payload: error,
});

export const fetchUserLevels = (pageNumber, pageSize) => ({
  type: FETCH_USER_LEVELS,
  payload: {
    page: pageNumber,
    pageSize: pageSize,
  },
});

export const addUserLevel = (userLevel) => ({
  type: ADD_USER_LEVEL,
  payload: userLevel,
});

export const updateUserLevel = (userLevel) => ({
  type: UPDATE_USER_LEVEL,
  payload: userLevel,
});

export const deleteUserLevel = (id) => ({
  type: DELETE_USER_LEVEL,
  payload: id,
});
