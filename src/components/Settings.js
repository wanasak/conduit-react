import React, { Component } from 'react';
import { connect } from 'react-redux';

class SettingsForm extends Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="URL of profile picture"
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows="8"
              placeholder="Short bio about you"
            />
          </fieldset>

          <fieldset className="form-group">
            <input type="email" className="form-control" placeholder="Email" />
          </fieldset>

          <fieldset className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
            />
          </fieldset>

          <button
            type="submit"
            className="btn btn-lg btn-primary pull-xs-right"
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({});

class Settings extends Component {
  render() {
    return <div />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
