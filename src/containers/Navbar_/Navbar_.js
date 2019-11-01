import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
  import Logo from '../Logo/Logo';
  import "./Navbar_.css";

export default class Navbar_ extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  navigate(id){   
    document.getElementById(id).scrollIntoView() 
  }
  render() {
    return (
      <div>
        <Navbar light expand="md" style={{backgroundColor: window.scrollY === 0 ? 'transparent': 'white'}}>
          <NavbarBrand href="/#top" onClick={() => this.navigate("#top")} className="col-md-3 col"><Logo style={{width: '12rem',height: '2.5rem'}} size='full' color='black' background='trans' padding={false}/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem  style={{borderColor:'transparent'}}>
                <NavLink  href="/#about" onClick={() => this.navigate("#about")}>Kenapa Harus Bisa?</NavLink>
              </NavItem>
              <NavItem style={{borderColor:'transparent'}}>
                <NavLink  href="/#pricing" onClick={() => this.navigate("#pricing")}>Harga</NavLink>
              </NavItem>
              <NavItem style={{maxHeight:"max-content"}}>
                <NavLink className="nav-link-special" href="/login">Login</NavLink>
              </NavItem>
              <NavItem style={{maxHeight:"max-content"}} >
                <NavLink  className="nav-link-special" href="/signup">Daftar</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}