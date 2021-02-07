import React from 'react';
import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost:3000';

class Login extends React.Component {
  state = {
    email:'',
    password:'',
    error: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state

    axios.post(`${SERVER_BASE_URL}/login.json`,
      { email, password },
      { withCredentials: true }
    )
    .then( response => {
      if(response.data.logged_in){
        this.props.handleLogin(response.data)
      } else {
        this.setState({
          error: response.data.errors
        })
      }
    })
    .catch(console.warn)
  }

  render(){
    return(
      <div className="auth-dialog" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={ this.handleSubmit }>
          <h4>Login</h4>
          {
            this.state.error !== '' && <div className="error">{this.state.error}</div>
          }
          <div>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={ this.handleChange }
              required
              />
          </div>
          <div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={ this.handleChange }
              required
              />
          </div>
          <div>
            <button className="button" type="submit">Login</button>
          </div>
        </form>
        <span onClick={ () => this.props.switchAuthForm('signup', true) }>
          Don't have an account? Signup.
        </span>
      </div>
    )
  }
}

export default Login
