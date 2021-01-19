import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

//Creates required value for form validation, displays message when field does not pass validation
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  //Checks for valid email
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  //Checks for valid username
  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  //Checks for valid password
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
  export default class Register extends Component {
    //Creates state to manage and store data from registration fields
    constructor(props) {
      super(props);
      this.handleRegister = this.handleRegister.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        email: "",
        password: "",
        successful: false,
        message: ""
      };
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  //Function to validate and create account for user
    handleRegister(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        successful: false
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        AuthService.register(
          this.state.username,
          this.state.email,
          this.state.password
        ).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true,
            })
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    }
  //Rengers registration form
    render() {
      return (
   
          

  
            <Form 
              className="register-form"
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                <div className="form-title"> 
                <h1 className="mb-3" align="center"> Register for IMS</h1> </div>
                  <div className="form-group mt-3">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control mt-2"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
  
                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control mt-2"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>
  
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control mt-2"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
  
                  <div className="form-group">
                    <button className="btn btn-primary btn-block mt-4">Sign Up</button>
                  </div>
                  <div className="text-align center">
                    <a href="/login" className="mt-3">
                    Login to existing account
                </a>
            </div>
                </div>
              )}
  
              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>

   
      );
    }
  }