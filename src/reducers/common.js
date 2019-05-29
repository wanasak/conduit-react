import {
  APP_LOAD,
  REGISTER,
  LOGIN,
  REGISTER_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  ARTICLE_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  LOGOUT,
  REDIRECT
} from '../constants/actionTypes';

const defaultState = {
  appName: 'conduit',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case ARTICLE_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
