import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import AuthService from './containers/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar_ from './containers/Navbar_/Navbar_';

const auth = new AuthService();
 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      scrollTop: true,
      visibility: true
    };

    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.isNavVisible = this.isNavVisible.bind(this);
  }



  async componentWillReceiveProps(nextProps){
   let currentRoutes = nextProps.location;
     if (currentRoutes.pathname === '/notfound' || currentRoutes.pathname === '/login' || currentRoutes.pathname === '/signup' ) {

      this.setState({ visibility: false });
    }
    else{
      this.setState({ visibility: true });
    }

  }

  Auth = auth;
  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  async componentDidMount(){
    if (this.Auth.loggedIn()){
      this.userHasAuthenticated(true)
    }
    window.addEventListener('scroll', this.handleScroll);
    let currentRoutes = this.props.location;
    if (currentRoutes.pathname === '/notfound') {
      this.setState({ visibility: false });
    } 
  }

  async componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    if (window.scrollY == 0) {
        this.setState({scrollTop: true});
    }
    else if (window.scrollY != 0 ) {
        this.setState({scrollTop: false});
    }
  }

  isNavVisible = visible => {
    this.setState({visibility: visible});
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      Auth: this.Auth,
      visibility: this.state.visibility,
      isNavVisible: this.isNavVisible,
      handleScroll : this.handleScroll,

    };

    if (this.state.visibility){
    return (
      <div className="App">
        <Navbar_/>
        <Routes childProps={childProps}/>
      </div>
    );
  }

  else{
    return(
      <Routes childProps={childProps}/>
      )
  }
}
}

export default withRouter(App);