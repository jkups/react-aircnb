import React from 'react';
import Login from './Login';
// import Signup from './Signup';


class AuthModal extends React.Component {
  render(){
    const showHide = this.props.authVisible ? 'show-modal' : 'hide-modal'
    return(
      <div className={ showHide }>
        <Login />
      </div>
    )
  }
}

export default AuthModal
