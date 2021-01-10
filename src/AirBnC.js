import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Demo from './Demo'
import AuthModal from './components/authentication/AuthModal'
import Header from './components/Header'
import Footer from './components/Footer'
import Terms from './components/Terms'
import Contact from './components/Contact'
import About from './components/About'


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

        <Header />

        <Router>

          <Link onClick={ this.showHideAuthModal }>Login</Link>
            <Link to="/demo" >Demo Link</Link>
          <Route exact path = "/About" component = {About} />
          <Route exact path = "/Terms" component = {Terms} />
          <Route exact path = "/Contact" component = {Contact} />
          <Route exact path="/demo"
            render={ props => <Demo {...props} showAuthModal={this.showHideAuthModal} /> }
          />

        <AuthModal
        authVisible={ this.state.authModalVisible }
        showAuthModal={ this.showHideAuthModal }
        />

            <Footer />
          </Router>

      </div>
    )
  }
}

export default AirBnC;
