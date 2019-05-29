import React from 'react';
import { connect } from 'react-redux';
import { ListErrors } from './ListErrors';
import {
  ADD_TAG,
  REMOVE_TAG,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_LOADED
} from '../constants/actionTypes';
import agent from '../agent';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: payload => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload => dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: () => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onUnload(
          agent.Articles.get(this.props.match.params.slug)
        );
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(
        agent.Articles.get(this.props.match.params.slug)
      );
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="Article Title"
                      className="form-control form-control-lg"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="What's this article about?"
                      className="form-control"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      placeholder="Write your article (in markdown)"
                      rows="8"
                      className="form-control"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      type="text"
                      placeholder="Enter tags"
                      className="form-control"
                    />
                  </fieldset>
                </fieldset>

                <button
                  type="button"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Publish Article
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
