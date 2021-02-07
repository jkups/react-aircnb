import React from 'react';
import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost:3000';

class Login extends React.Component {
  state = {
    name:'',
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
    const user = this.state

    axios.post(`${SERVER_BASE_URL}/users.json`,
      { user },
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
          <h4>Signup</h4>
          {
            this.state.error !== '' && <div className="error">{this.state.error}</div>
          }
          <div>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Full name"
              onChange={ this.handleChange }
              required
              />
          </div>
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
            <button className="button" type="submit">Signup</button>
          </div>
        </form>
        <span onClick={ () => this.props.switchAuthForm('login', true) }>
          Have an account? Login.
        </span>
      </div>
    )
  }
}

export default Login
