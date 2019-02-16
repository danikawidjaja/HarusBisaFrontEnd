import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import logo from './logokrul.png';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { NavHashLink as Link } from 'react-router-hash-link';
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import AuthService from './containers/AuthService';
import AppliedRoute from './components/AppliedRoute';

const auth = new AuthService();
 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      navExpanded: false,
      scrollTop: true,
      toggled: false,
      visibility: false
    };

    this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }



  async componentWillReceiveProps(nextProps){
   let currentRoutes = nextProps.location;
     if (currentRoutes.pathname === '/notfound' || currentRoutes.pathname === '/login' || currentRoutes.pathname === '/signup') {

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

  handleToggle(event){
    console.log(this.state.toggled)
    if (this.state.toggled){
      this.setState({toggled: false})
    }
    else{
      this.setState({toggled: true})
    }
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
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      Auth: this.Auth,
    };

    if (this.state.visibility){
    return (
      <div className="App">
        <Navbar onToggle={this.handleToggle} collapseOnSelect={true} fluid fixedTop style={{ backgroundColor: (this.state.scrollTop|| this.state.toggled) ? 'transparent' : 'white'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img class="App-image" src={logo}/>HARUSBISA</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated ?
                <Fragment>
                  <LinkContainer to="/profile">
                    <NavItem >Profil</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/courses">
                    <NavItem >Mata Kuliah</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
                : 
                <Fragment>
                  <LinkContainer to='/home#about' className='navspec'>
                    <NavItem >
                      Kenapa HarusBisa?
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/#pricing" className='navspec'>
                    <NavItem >Harga</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem >Login</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem >Daftar</NavItem>
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

  else{
    return(
      <Routes childProps={childProps}/>
      )
  }
}
}

export default withRouter(App);