import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from './logokrul.png';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
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
      navExpanded: false,
    };

    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
  }

  Auth = auth;
  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  setNavExpanded(expanded){
    this.setState({navExpanded: expanded});
  }

  closeNav(){
    this.setState({navExpanded: false});
  }

  handleLogout = async event => {
    await this.Auth.logout();
    this.userHasAuthenticated(false);
    this.props.history.push('/');
  }

  async componentDidMount(){
    if (this.Auth.loggedIn()){
      this.userHasAuthenticated(true)
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      Auth: this.Auth,
    };

    
    return (
      <div className="App container">
        <Navbar collapseOnSelect={true} fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img class="App-image" src={logo}/>HARUSBISA</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated ?
                <Fragment>
                  <LinkContainer to="/profile">
                    <NavItem >PROFIL</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/courses">
                    <NavItem >MATA KULIAH</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>LOGOUT</NavItem>
                </Fragment>
                : 
                <Fragment>
                  <LinkContainer to="/why">
                    <NavItem >TENTANG</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/pricing">
                    <NavItem >HARGA</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem >LOG IN</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem >DAFTAR</NavItem>
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