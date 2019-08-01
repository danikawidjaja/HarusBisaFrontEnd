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
  render() {
    return (
      <div>
        <Navbar light expand="md" style={{backgroundColor: window.scrollY == 0 ? 'transparent': 'white'}}>
          <NavbarBrand href="/#top"><Logo style={{width: '12rem',height: '2.5rem'}} size='full' color='black' background='trans' padding={false}/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem  style={{borderColor:'transparent'}}>
                <NavLink href="/#about">Kenapa Harus Bisa?</NavLink>
              </NavItem>
              <NavItem style={{borderColor:'transparent'}}>
                <NavLink href="/#pricing">Harga</NavLink>
              </NavItem>
              <NavItem style={{maxHeight:"max-content"}}>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem style={{maxHeight:"max-content"}} >
                <NavLink href="/signup">Daftar</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}