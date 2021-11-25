import React, { Component } from "react";
import "./styles.css";
import { connect } from "react-redux";
import { updateUser } from "../../actions";
import { updateUserOperation } from "../../operations/userOperations";

class ClientForms extends Component {
  constructor() {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      id: null,
      birthDate: null,
      phone: null,
      email: null,
      companyName: null,
      companyNumber: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterNumberInput = this.filterNumberInput.bind(this);
    this.removeEmpty = this.removeEmpty.bind(this);
  }

  filterNumberInput(e) {
    let charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) e.preventDefault();
    return true;
  }

  removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null && v != "")
    );
  }

  async handleSubmit(event) {
    let { userData } = this.props.common;
    let firstName = event.target.elements["first_name"].value;
    let lastName = event.target.elements["last_name"].value;
    let id = event.target.elements["TZ"].value;
    let birthDate = event.target.elements["birth_date"].value;
    let phone = event.target.elements["phone"].value;
    let email = event.target.elements["email"].value;
    let companyName = event.target.elements["company_name"].value;
    let companyNumber = event.target.elements["company_number"].value;

    event.preventDefault();
    let user = {
      first_name: firstName,
      last_name: lastName,
      TZ: id,
      birth_date: birthDate,
      phone,
      email,
      company_name: companyName,
      company_number: companyNumber,
    };
    user = this.removeEmpty(user);

    // this.props.updateUser(userData);
    await this.props.updateUserOperation(user, userData.user.id);
    this.setState({
      firstName,
      lastName,
      id,
      birthDate,
      phone,
      email,
      companyName,
      companyNumber,
    });

    this.props.nextStep();
  }

  componentDidMount() {
    let { user } = this.props.common.userData;
    this.setState({
      firstName: user.first_name,
      lastName: user.last_name,
      id: user.TZ,
      birthDate: user.birth_date,
      phone: user.phone,
      email: user.email,
      companyName: user.company_name,
      companyNumber: user.company_number,
    });
  }

  render() {
    return (
      <div className="forms-holder user-forms-holder">
        <form onSubmit={this.handleSubmit}>
          <div className="in-form user-in-form">
            <div className="functional-form user-functional-form">
              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">First name:</label>
                  <input
                    className="user-input-el input-el"
                    name="first_name"
                    type="text"
                    defaultValue={this.state.firstName}
                    placeholder="fisrt name"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Last name:</label>
                  <input
                    className="user-input-el input-el"
                    name="last_name"
                    type="text"
                    defaultValue={this.state.lastName}
                    placeholder="last name"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">ID:</label>
                  <input
                    className="user-input-el input-el"
                    name="TZ"
                    type="text"
                    defaultValue={this.state.id}
                    placeholder="id"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Birth date:</label>
                  <input
                    className="user-input-el input-el"
                    name="birth_date"
                    type="date"
                    defaultValue={this.state.birthDate}
                    placeholder="birth date"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Phone number:</label>
                  <input
                    className="user-input-el input-el"
                    name="phone"
                    type="text"
                    defaultValue={this.state.phone}
                    placeholder="phone number"
                    onKeyPress={this.filterNumberInput}
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Email:</label>
                  <input
                    className="user-input-el input-el"
                    name="email"
                    type="text"
                    defaultValue={this.state.email}
                    placeholder="email"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Company name:</label>
                  <input
                    className="user-input-el input-el"
                    name="company_name"
                    type="text"
                    defaultValue={this.state.companyName}
                    placeholder="company name"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-label">
                <div className="user-hold-input hold-input">
                  <label className="input-label">Company number:</label>
                  <input
                    className="user-input-el input-el"
                    name="company_number"
                    type="text"
                    defaultValue={this.state.companyNumber}
                    placeholder="company number"
                    required
                  />
                </div>
              </div>

              <div className="hold-label user-hold-button">
                <div className="user-hold-input hold-input">
                  <input
                    className="submit-login user-submit-login"
                    type="submit"
                    value="Next"
                  />
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

export default connect(mapStateToProps, { updateUser, updateUserOperation })(
  ClientForms
);
