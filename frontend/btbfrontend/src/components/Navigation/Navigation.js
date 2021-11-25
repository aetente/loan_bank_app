import React, { Component } from "react";
import LoginWindow from "../../components/LoginWindow/LoginWindow";
import ClientDetails from "../ClientDetails/ClientDetails";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";

class Navigation extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginWindow />} />
          <Route path="/user/details" element={<ClientDetails />} />
        </Routes>
      </Router>
    );
  }
}

export default Navigation;
