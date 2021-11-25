import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";

class BankInputLine extends Component {
  constructor() {
    super();
    this.state = {};
    this.filterNumberInput = this.filterNumberInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  filterNumberInput(e) {
    let charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
    return true;
  }

  handleInputChange(e, propName) {
    let { position, setBankData, bankData } = this.props;
    bankData[propName] = e.target.value;
    setBankData(position, bankData);
  }

  render() {
    let { deleteBank, position, bankData } = this.props;
    console.log("position", position);
    return (
      <div className="functional-form bank-functional-form user-functional-form">
        <div className="hold-label bank-hold-label">
          <div className="user-hold-input hold-input">
            <label className="input-label">Bank name:</label>
            <select
              className="user-input-el input-el"
              name="bank_name"
              type="text"
              key={`${position}-${bankData.bank_name}`}
              defaultValue={bankData.bank_name}
              placeholder="bank name"
              onChange={(e) => {
                this.handleInputChange(e, "bank_name");
              }}
              required
            >
              <option value="bank1">bank1</option>
              <option value="bank2">bank2</option>
              <option value="bank3">bank3</option>
              <option value="bank4">bank4</option>
            </select>
          </div>
        </div>

        <div className="hold-label bank-hold-label">
          <div className="user-hold-input hold-input">
            <label className="input-label">Bank branch:</label>
            <input
              className="user-input-el input-el"
              name="bank_branch"
              type="text"
              key={`${position}-${bankData.bank_branch}`}
              defaultValue={bankData.bank_branch}
              placeholder="bank branch"
              onChange={(e) => {
                this.handleInputChange(e, "bank_branch");
              }}
              required
            />
          </div>
        </div>

        <div className="hold-label bank-hold-label">
          <div className="user-hold-input hold-input">
            <label className="input-label">Bank number:</label>
            <input
              className="user-input-el input-el"
              name="bank_number"
              type="text"
              key={`${position}-${bankData.bank_number}`}
              defaultValue={bankData.bank_number}
              placeholder="bank number"
              onChange={(e) => {
                this.handleInputChange(e, "bank_number");
              }}
              required
            />
          </div>
        </div>

        <div className="hold-label bank-hold-label">
          <div className="user-hold-input hold-input">
            <button
              type="button"
              onClick={() => {
                deleteBank(position);
              }}
              className="user-input-el input-el"
            >
              delete
            </button>
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

export default connect(mapStateToProps, {})(BankInputLine);
