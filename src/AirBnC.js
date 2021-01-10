import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Demo from './Demo'
import AuthModal from './components/authentication/AuthModal'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

class AirBnC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authModalVisible: false,
      isLoggedIn: false,
      user: {}
    };
  };

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
          <Route exact path="/search" component={SearchBar }/>
          <Route exact path="/search/:searchText/:startDate/:endDate" component={SearchResults }/>
        <AuthModal
        authVisible={ this.state.authModalVisible }
        showAuthModal={ this.showHideAuthModal }
        />
        <SearchBar/>
        </Router>
      </div>
    )
  }
}

export default AirBnC;
