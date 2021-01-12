import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import './App.css';

//Authentication Components
import AuthModal from './components/authentication/AuthModal'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'

//Reservation components
import Reservation from './components/reservation/Reservation'

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
      console.log(response);
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

            <div className="container-fluid position-fixed nav">
              <Header />
              <div className="container">
                <Route path = "/" component = {SearchBar} />
                <nav>
                  {
                    this.state.isLoggedIn ?
                    <span>
                      <Link onClick={ this.handleLogout }>Logout</Link>
                    </span>
                    :
                    <span>
                      <Link onClick={ () => this.toggleAuthModal('login', true) }>Login</Link>
                    </span>
                  }
                  <span>
                    <Link to="/property/9" >Demo Reservation</Link>
                  </span>
                </nav>
              </div>
            </div>
            <Route exact path = "/" component = {Home} />
            <Route exact path="/search/:searchText/:startDate/:endDate" component={ SearchResults } />
            <Route exact path="/property/:listing_id/:startDate/:endDate" component={ Reservation } /> 
            <Route exact path = "/About" component = {About} />
            <Route exact path = "/Terms" component = {Terms} />
            <Route exact path = "/Contact" component = {Contact} />
            <Footer />
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


        </Router>

      </div>
    )
  }
}

export default AirBnC;
