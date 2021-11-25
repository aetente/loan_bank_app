import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom";

class LoginWindow extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let { common } = this.props;
    console.log("COMMON", common);
    return (
      <div className="App">
        <div className="main">
          <div className="center-block">
            <div>
              {(common.userData && common.userData.accsess_token && (
                <Navigate to="user/details/" />
              )) || <Login />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, {})(LoginWindow);
