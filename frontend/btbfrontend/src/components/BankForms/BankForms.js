import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { updateUser } from "../../actions";
import BankInputLine from "../BankInputLine/BankInputLine";
import { updateBanksOperation } from "../../operations/userOperations";

class BankForms extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      companyName: null,
      companyNumber: null,
      banksData: [],
      toDelete: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterNumberInput = this.filterNumberInput.bind(this);
    this.setBankData = this.setBankData.bind(this);
    this.addBank = this.addBank.bind(this);
    this.deleteBank = this.deleteBank.bind(this);
    this.mapBanks = this.mapBanks.bind(this);
  }

  setBankData(n, theData) {
    let { banksData } = this.state;
    banksData[n] = theData;
    this.setState({
      banksData,
    });
  }

  addBank(e) {
    let { banksData } = this.state;
    let { user } = this.props.common.userData;
    banksData.push({
      bank_name: "",
      bank_branch: "",
      bank_number: "",
      user: user.id,
    });
    this.setState({
      banksData,
    });
  }

  deleteBank(n) {
    let { banksData, toDelete } = this.state;
    if (banksData[n].id) {
      toDelete.push(banksData[n].id);
      this.setState({
        toDelete,
      });
    }
    delete banksData[n];
    this.setState({
      banksData,
    });
  }

  mapBanks(banksData) {
    return banksData.map((bank, i) => {
      return (
        <BankInputLine
          key={`bank-${i}`}
          position={i}
          deleteBank={this.deleteBank}
          bankData={bank}
          setBankData={this.setBankData}
        />
      );
    });
  }

  filterNumberInput(e) {
    let charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
    return true;
  }

  async handleSubmit(event) {
    let { banksData, toDelete } = this.state;
    let { updateBanksOperation } = this.props;

    let toAdd = [];
    let toUpdate = [];
    for (let i = 0; i < banksData.length; i++) {
      let bankEl = banksData[i];
      if (bankEl) {
        if (!bankEl.id) {
          toAdd.push(bankEl);
        } else {
          toUpdate.push(bankEl);
        }
      }
    }
    event.preventDefault();

    await updateBanksOperation({
      banks: banksData,
      toChange: { toAdd, toUpdate, toDelete },
    });

    this.props.nextStep();
  }

  componentDidMount() {
    let { userData } = this.props.common;
    console.log("componentDidMount", userData);
    this.setState({
      id: userData.user.TZ,
      companyName: userData.user.company_name,
      companyNumber: userData.user.company_number,
      banksData: userData.banks,
    });
  }

  render() {
    let { previousStep } = this.props;
    let { banksData, companyName, companyNumber } = this.state;
    return (
      <div className="forms-holder user-forms-holder">
        <div className="in-form bank-in-form user-in-form">
          <div className="hold-companies">
            <div>Company name: {companyName}</div>
            <div>Company number: {companyNumber}</div>
          </div>
          <div className="center-block">
            <button
              type="button"
              onClick={this.addBank}
              className="user-input-el input-el add-bank"
            >
              Add bank
            </button>
          </div>
          <form onSubmit={this.handleSubmit}>
            {banksData && this.mapBanks(banksData)}

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
          </form>
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

export default connect(mapStateToProps, { updateUser, updateBanksOperation })(
  BankForms
);
