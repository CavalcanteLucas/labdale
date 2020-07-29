import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

import { clearSuccessMessage } from "./actions";

export class Messager extends React.Component {
  static propTypes = {
    messageList: PropTypes.array,
    clearSuccessMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    messageList: []
  };

  handleCloseMessage = index => {
    const { clearSuccessMessage } = this.props;
    clearSuccessMessage(index);
  };

  render() {
    const { messageList } = this.props;
    return (
      <div>
        {messageList.map((message, index) => (
          <Alert
            variant="success"
            onClose={() => this.handleCloseMessage(index)}
            dismissible
            key={`a${message.id}`}
          >
            {message}
          </Alert>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageList: state.messager.messageList
});

const mapDispatchToProps = dispatch => ({
  clearSuccessMessage: index => dispatch(clearSuccessMessage(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Messager);
