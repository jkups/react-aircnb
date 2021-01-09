import React from 'react';
import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost:3000';

class Login extends React.Component {
  state = {
    email:'',
    password:''
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
      console.log(response.data);
      if(response.data.logged_in){
        this.props.handleLogin(response.data)
      }
    })
    .catch(console.warn)
  }

  render(){
    return(
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your email address"
            onChange={ this.handleChange }
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login
