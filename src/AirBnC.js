import React from 'react';
import { Redirect, Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import './App.css';

// Authentication Components
import AuthModal from './components/authentication/AuthModal'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'

// Reservation components
import Reservation from './components/reservation/Reservation'

// Payment components
import Payment from './components/payment/Payment'
import Confirmation from './components/Confirmation'

// Common Components
import Header from './components/Header'
import Footer from './components/Footer'
import Terms from './components/Terms'
import Contact from './components/Contact'
import About from './components/About'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';


const SERVER_BASE_URL = 'http://localhost:3000';

class AirBnC extends React.Component {
  state = {
    authForm: '',
    authModalVisible: false,
    isLoggedIn: false,
    user: {}
  }

  getLoginStatus = () =>{
    axios.get(`${SERVER_BASE_URL}/logged_in`,{
      withCredentials: true
    })
    .then( response => {
      if(response.data.logged_in){
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(console.log)
  }

  toggleAuthModal = (form, visible) => {
    this.setState({
      authModalVisible: visible,
      authForm: form
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
<<<<<<< HEAD
          <div>
            <Header />
            <div className="container nav">
=======
          <div className="container-fluid nav position-fixed">
            <Header />
            <div className="container">
              <Route path = "/" component = {SearchBar} />
>>>>>>> 3059e9d69b91ab9c3edeac303ffdd2c5bdb8f516
              <nav>

                {
                  this.state.isLoggedIn ?
                  <span>
                    <span onClick={ this.handleLogout }>Logout</span>
                  </span>
                  :
                  <span>
                    <span onClick={ () => this.toggleAuthModal('login', true) }>Login</span>
                  </span>
                }
                <span>
                  <Link to="/" className="inline" > Home </Link>
                </span>
              </nav>
            </div>
          </div>

          <Route exact path = "/" component = {Home} />
          <Route exact path = "/About" component = {About} />
          <Route exact path = "/Terms" component = {Terms} />
          <Route exact path = "/Contact" component = {Contact} />
          <Route exact path="/search" component={SearchBar }/>

          <Route exact path="/search/:searchText/:startDate/:endDate" component={SearchResults }/>

          <Route exact path="/property/:listing_id/:startDate/:endDate" render={ props => <Reservation {...props} toggleAuthModal={ this.toggleAuthModal} isLoggedIn={this.state.isLoggedIn} user={this.state.user} /> } />

          <Route exact path="/book/:reservation_id/confirmation" component={Confirmation} />

          <Route exact path="/book/:reservation_id/:startDate/:endDate" render={ props => <Payment {...props} isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} /> } />

{
          // <Route exact path="/search/:reservationId/:startDate/:endDate" >
          //   {
          //     this.state.isLoggedIn ? <Payment /> : <Redirect to="/search" />
          //   }
          // </Route>
}
          {
            // Authentication Component
            // Available on all routes
          }
          {
            this.state.authModalVisible ?
            <AuthModal>
              {
                this.state.authForm === 'login' ?
                <Login
                  handleLogin={ this.handleLogin }
                  toggleAuthModal={ this.toggleAuthModal }
                  /> :
                <Signup
                  handleLogin={ this.handleLogin }
                  toggleAuthModal={ this.toggleAuthModal }
                  />
              }
            </AuthModal> : null
          }

          <Footer />
        </Router>
      </div>
    )
  }
}

export default AirBnC;
