import React from 'react';

class AuthModal extends React.Component {
  render(){
    return(
      <div className="auth-modal">
        <div className="auth-wrapper" onClick={this.props.toggleAuthModal}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AuthModal
