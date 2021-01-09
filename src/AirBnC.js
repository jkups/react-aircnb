import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Demo from './Demo'
import AuthModal from './components/authentication/AuthModal'

class AirBnC extends React.Component {
  state = {
    authModalVisible: false,
    isLoggedIn: false,
    user: {}
  }

  getLoginStatus = () =>{
    axios.get(URL,{
      withCredentials: true
    })
    .then( data => {
      
    })
  }
  showHideAuthModal = () => {
    this.setState({
      authModalVisible: !this.state.authModalVisible
    })
  }

  handleLogin = data => {
    this.setState({
      user: data.user,
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  handleLogout = () => {
    this.setState({
      user: {},
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  render(){
    return(
      <div>
        <Router>
          <Link onClick={ this.showHideAuthModal }>Login</Link>
          <Link to="/demo" >Demo Link</Link>
          <Route exact path="/demo"
            render={ props => <Demo {...props} showAuthModal={this.showHideAuthModal} /> }
          />
        </Router>
        <AuthModal
        authVisible={ this.state.authModalVisible }
        showAuthModal={ this.showHideAuthModal }
        />
      </div>
    )
  }
}

export default AirBnC;
