import React from 'react';

// import Signup from './Signup';


class AuthModal extends React.Component {
  render(){
    return(
      <div className="auth-modal">
        {this.props.children}
      </div>
    )
  }
}

export default AuthModal
