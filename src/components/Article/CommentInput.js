import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import agent from '../../agent';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends Component {
  constructor() {
    super();
    this.state = { body: '' };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      const payload = agent.Comment.create(this.props.slug, {
        body: this.state.body
      });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea
            rows="3"
            className="form-control"
            value={this.state.body}
            onChange={this.setBody}
          />
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img"
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(CommentInput);
