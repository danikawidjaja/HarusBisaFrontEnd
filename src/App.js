import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from './logokrul.png';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import AuthService from './containers/AuthService';
const auth = new AuthService();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  Auth = auth;
  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  handleLogout = async event => {
    await this.Auth.logout();
    this.userHasAuthenticated(false);
    this.props.history.push('/');
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      Auth: this.Auth,
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img class="App-image" src={logo}/>Harus Bisa</Link>
            </Navbar.Brand>
             <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated ?
                <Fragment>
                  <LinkContainer to="/profile">
                    <NavItem >Profile</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/courses">
                    <NavItem >Courses</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
                : 
                <Fragment>
                  <LinkContainer to="/why">
                    <NavItem >Why Harus Bisa?</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/pricing">
                    <NavItem >Pricing</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem >Sign up</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem >Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }    
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps}/>
      </div>
    );
  }
}

export default withRouter(App);