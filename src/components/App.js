import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Header from './Header';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

class App extends Component {
  render() {
    return (
      <div>
        <Header appName="APP NAME" currentUser={null} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
