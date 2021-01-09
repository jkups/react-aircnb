import React from 'react';

class Login extends React.Component {
  render(){
    return(
      <div>
        <form>
          <input type="text" placeholder="Enter your email address" />
          <input type="password" placeholder="Enter your email address" />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login
