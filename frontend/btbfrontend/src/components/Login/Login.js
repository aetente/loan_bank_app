import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { loginOperation } from "../../operations/userOperations";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    let username = event.target.elements["username"].value;
    let password = event.target.elements["password"].value;
    event.preventDefault();
    await this.props.loginOperation(username, password);
  }

  render() {
    let { loginError } = this.props;
    return (
      <div className="login-holder">
        <form onSubmit={this.handleSubmit}>
          <div className="in-form">
            <div className="functional-form">
              {loginError && (
                <div className="error">
                  The username or password you entered is not correct
                </div>
              )}
              <div className="hold-label">
                <label className="input-label">Name:</label>
                <div className="hold-input">
                  <input
                    className="input-el"
                    name="username"
                    type="text"
                    value={this.state.value}
                    required
                  />
                </div>
              </div>

              <div className="hold-label">
                <label className="input-label">Password:</label>
                <div className="hold-input">
                  <input
                    className="input-el"
                    name="password"
                    type="password"
                    value={this.state.value}
                    required
                  />
                </div>
              </div>
              <input className="submit-login" type="submit" value="LOGIN" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    state: state,
    loginError: state.common.loginError,
  };
};

export default connect(mapStateToProps, {
  loginOperation,
})(Login);
