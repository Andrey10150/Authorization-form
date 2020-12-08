import React, { Component } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import AuthService from '../services/auth.service'
import CountryService from '../services/country.service'
import DatePicker from 'react-date-picker'
import Select from 'react-select'

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    )
  }
}

const vlogin = value => {
  if (value.length < 3 || value.length > 255) {
    return (
      <div className="alert alert-danger" role="alert">
        The login must be between 3 and 255 characters.
      </div>
    )
  }
}

const vrealName = value => {
  if (value.length < 3 || value.length > 255) {
    return (
      <div className="alert alert-danger" role="alert">
        The real name must be between 3 and 255 characters.
      </div>
    )
  }
}

const vpassword = value => {
  if (value.length < 6 || value.length > 255) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 255 characters.
      </div>
    )
  }
}

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      login: '',
      realName: '',
      password: '',
      birthDate: new Date(),
      country: '',
      countriesList: [],
      agree: false,
      successful: false,
      message: ''
    }
  }

  componentDidMount() {
    CountryService.getAllCountries()
      .then(data => {
        let countries = data.data.map(country => {
          return {
            label: country.country_name,
            value: country.country_name
          }
        })
        this.setState({
          countriesList: countries
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  onChangeLogin = e => {
    this.setState({
      login: e.target.value
    })
  }

  onChangeRealName = e => {
    this.setState({
      realName: e.target.value
    })
  }

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  onChangeBirthDate = date => {
    this.setState({
      birthDate: date
    })
  }

  onChangeCountry = selectedObject => {
    this.setState({
      country: selectedObject.value
    })
  }

  onChangeAgree = e => {
    this.setState({
      agree: e.target.checked
    })
  }

  handleRegister = e => {
    e.preventDefault()

    this.setState({
      message: '',
      successful: false
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.email,
        this.state.login,
        this.state.realName,
        this.state.password,
        this.state.birthDate,
        this.state.country
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          })
          this.handleLogin()
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          this.setState({
            successful: false,
            message: resMessage
          })
        }
      )
    }
  }

  handleLogin = () => {
    this.setState({
      message: ''
    })

    this.form.validateAll()

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.login, this.state.password).then(
        () => {
          this.props.history.push('/profile')
          window.location.reload()
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          this.setState({
            message: resMessage
          })
        }
      )
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="login">Login</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="login"
                    value={this.state.login}
                    onChange={this.onChangeLogin}
                    validations={[required, vlogin]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="realName">Real Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="realName"
                    value={this.state.realName}
                    onChange={this.onChangeRealName}
                    validations={[required, vrealName]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Birth Date</label>
                  <DatePicker
                    className="datePicker"
                    id="birthDate"
                    value={this.state.birthDate}
                    onChange={this.onChangeBirthDate}
                    clearIcon={null}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Select
                    name="country"
                    placeholder={this.state.country}
                    onChange={this.onChangeCountry}
                    options={this.state.countriesList}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agree"
                      onChange={this.onChangeAgree}
                    />
                    <label className="form-check-label" htmlFor="agree">
                      agree with terms and conditions
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={!this.state.agree}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? 'alert alert-success'
                      : 'alert alert-danger'
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={c => {
                this.checkBtn = c
              }}
            />
          </Form>
        </div>
      </div>
    )
  }
}
