import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Header from './Header';
import Login from './Login';
import { REDIRECT, APP_LOAD } from '../constants/actionTypes';
import agent from '../agent';
import { store } from '../store';
import { push } from 'react-router-redux';
import Settings from './Settings';
import Editor from './Editor';
import Profile from './Profile';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT })
});

class App extends Component {
  // ROUTER
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header appName="APP NAME" currentUser={this.props.currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/editor" component={Editor} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }

    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
