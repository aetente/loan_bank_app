import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { updateUser } from "../../actions";
import { postLoanOperation } from "../../operations/userOperations";

class ClientForms extends Component {
  constructor() {
    super();
    this.state = {
      loanPeriod: 4,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterNumberInput = this.filterNumberInput.bind(this);
    this.changeLoanPeriod = this.changeLoanPeriod.bind(this);
  }

  filterNumberInput(e) {
    let charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
    return true;
  }

  async handleSubmit(event) {
    let loan_amount = event.target["loan_amount"].value;
    let loan_period = event.target["loan_period"].value;
    let { user } = this.props.common.userData;
    event.preventDefault();

    await this.props.postLoanOperation({
      loan_amount,
      loan_period,
      user: user.id,
    });

    this.props.nextStep();
  }

  changeLoanPeriod(e) {
    let loanPeriod = e.target.value;
    this.setState({ loanPeriod });
  }

  render() {
    let { previousStep } = this.props;
    let { loanPeriod } = this.state;
    return (
      <div className="forms-holder user-forms-holder">
        <form onSubmit={this.handleSubmit}>
          <div className="in-form user-in-form">
            <div className="functional-form loan-functional-form user-functional-form">
              <div className="hold-label loan-hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Loan amount:</label>
                  <input
                    className="user-input-el input-el"
                    name="loan_amount"
                    type="text"
                    placeholder="loan amount"
                    onKeyPress={this.filterNumberInput}
                    required
                  />
                </div>
              </div>

              <div className="hold-label loan-hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">
                    Loan period (years): {loanPeriod}
                  </label>
                  <input
                    className="user-input-el input-el"
                    name="loan_period"
                    type="range"
                    min="4"
                    max="8"
                    step="0.5"
                    placeholder="loan period"
                    defaultValue={loanPeriod}
                    onChange={this.changeLoanPeriod}
                  />
                </div>
              </div>

              <div className="hold-label user-hold-button">
                <div className="user-hold-input hold-input hold-controls">
                  <input
                    className="submit-login user-submit-login control-button"
                    type="submit"
                    value="Next"
                  />

                  <button
                    type="button"
                    onClick={previousStep}
                    className="user-input-el input-el add-bank control-button back-button"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, { updateUser, postLoanOperation })(
  ClientForms
);
