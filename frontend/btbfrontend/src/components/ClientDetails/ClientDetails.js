import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import ClientForms from "../ClientForms/ClientForms";
import BankForms from "../BankForms/BankForms";
import LoanForms from "../LoanForms/LoanForms";

class ClientDetails extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
  }

  nextStep() {
    let { step } = this.state;
    step += 1;
    this.setState({ step });
  }

  previousStep() {
    let { step } = this.state;
    step -= 1;
    this.setState({ step });
  }

  render() {
    let { common } = this.props;
    let { step } = this.state;
    return (
      <div className="App">
        <div className="user-main main">
          {(common.userData &&
            common.userData.accsess_token &&
            ((step == 0 && <ClientForms nextStep={this.nextStep} />) ||
              (step == 1 && (
                <BankForms
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                />
              )) ||
              (step == 2 && (
                <LoanForms
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                />
              )) ||
              (step == 3 && "end"))) || <Navigate to="/" />}
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

export default connect(mapStateToProps, {})(ClientDetails);
