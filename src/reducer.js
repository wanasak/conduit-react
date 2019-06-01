import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './reducers/home';
import auth from './reducers/auth';
import common from './reducers/common';
import articleList from './reducers/articleList';
import editor from './reducers/editor';
import article from './reducers/article';
import settings from './reducers/settings';
import profile from './reducers/profile';

export default combineReducers({
  auth,
  common,
  home,
  editor,
  article,
  articleList,
  settings,
  profile,
  router: routerReducer
});
