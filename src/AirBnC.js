import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Authentication Components
import AuthModal from './components/authentication/AuthModal'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'

// Reservation components
import PropertyList from './components/properties/PropertyList';
import Reservation from './components/reservation/Reservation'

// Payment components
import Payment from './components/payment/Payment'
import Confirmation from './components/payment/Confirmation'

// Common Components
import Home from './components/Home';
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Terms from './components/Terms'
import Contact from './components/Contact'
import About from './components/About'
import UserProfile from './components/UserProfile'


const SERVER_BASE_URL = 'http://localhost:3000';

class AirBnC extends React.Component {
  state = {
    authForm: '',
    authModalVisible: '',
    isLoggedIn: '',
    user: {}
  }

  getLoginStatus = () =>{
    axios.get(`${SERVER_BASE_URL}/logged_in`,{
      withCredentials: true
    })
    .then( response => {
    response.data.logged_in ?
      this.handleLogin(response.data) :
      this.handleLogout()
    })
    .catch(console.log)
  }

  toggleAuthModal = () => {
    this.setState({
      authModalVisible: false,
    })
  }

  switchAuthForm = (form, visible) => {
    this.setState({
      authModalVisible: visible,
      authForm: form
    })
  }

  handleLogin = data => {
    sessionStorage.setItem('user', JSON.stringify(data.user))

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
      .then(data => {
        sessionStorage.removeItem('user')
        this.setState({
          user: {},
          isLoggedIn: false
        })
      })
    }
  }

  componentDidMount() {
    this.getLoginStatus()
  }

  render(){
    return(
      <div>
        <Router>

          <Route path="/" render={ props => <Navigation {...props} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} switchAuthForm={this.switchAuthForm} /> } />

          <Route exact path = "/" component = {Home} />
          <Route exact path = "/About" component = {About} />
          <Route exact path = "/Terms" component = {Terms} />
          <Route exact path = "/Contact" component = {Contact} />

          <Route exact path="/search" component={PropertyList}/>

          <Route exact path = "/profile" component ={UserProfile}  />

          <Route exact path="/property/:id" render={ props => <Reservation {...props} switchAuthForm={ this.switchAuthForm} isLoggedIn={this.state.isLoggedIn} user={this.state.user} /> } />

          <Route exact path="/book/:reservation_id/confirmation" component={Confirmation} />

          <Route exact path="/book/:reservation_id" render={ props => <Payment {...props} isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} /> } />


          {
            // Authentication Component
            // Available on all routes
          }
          {
            this.state.authModalVisible &&
            <AuthModal toggleAuthModal={this.toggleAuthModal}>
              {
                this.state.authForm === 'login' ?
                <Login
                  handleLogin={ this.handleLogin }
                  switchAuthForm={ this.switchAuthForm }
                  /> :
                <Signup
                  handleLogin={ this.handleLogin }
                  switchAuthForm={ this.switchAuthForm }
                  />
              }
            </AuthModal>
          }

          <Footer />
        </Router>
      </div>
    )
  }
}

export default AirBnC;
