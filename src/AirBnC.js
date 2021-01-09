import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Demo from './Demo'
import { getLoginStatus } from './AuthHelpers'
import AuthModal from './components/authentication/AuthModal'

const SERVER_BASE_URL = 'http://localhost:3000';

class AirBnC extends React.Component {
  state = {
    authModalVisible: false,
    isLoggedIn: false,
    user: {}
  }

  getLoginStatus = () =>{
    axios.get(`${SERVER_BASE_URL}/logged_in`,{
      withCredentials: true
    })
    .then( response => {
      console.log(response);
      if(response.data.logged_in){
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(console.log)
  }

  showHideAuthModal = () => {
    this.setState({
      authModalVisible: !this.state.authModalVisible
    })
  }

  handleLogin = data => {
    this.setState({
      authModalVisible: false,
      user: data.user,
      isLoggedIn: true
    })
  }

  handleLogout = () => {
    if(this.state.isLoggedIn){
      axios.delete(`${SERVER_BASE_URL}/login.json`,{
        withCredentials: true
      })
      .then(data => console.log(data))
    }

    this.setState({
      user: {},
      isLoggedIn: false
    })
  }

  componentDidMount() {
    this.getLoginStatus()
  }

  render(){
    return(
      <div>
        <Router>
          <Link onClick={ this.showHideAuthModal }>Login</Link>
          <Link onClick={ this.handleLogout }>Logout</Link>
          <Link to="/demo" >Demo Link</Link>
          <Route exact path="/demo"
            render={ props => <Demo {...props} showAuthModal={this.showHideAuthModal} /> }
          />
        </Router>
        <AuthModal
        authVisible={ this.state.authModalVisible }
        handleLogin={ this.handleLogin }
        />
      </div>
    )
  }
}

export default AirBnC;
