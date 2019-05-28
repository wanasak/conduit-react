import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './reducers/home';
import auth from './reducers/auth';
import common from './reducers/common';
import articleList from './reducers/articleList';

export default combineReducers({
  auth,
  common,
  home,
  articleList,
  router: routerReducer
});
