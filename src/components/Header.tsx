import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import {
  BrowserRouter as Router,
  NavLink as RouterNavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './Home';
import Memory from './Memory/Memory';
import Pendu from './Pendu/Pendu';

function Header(): JSX.Element {
  return (
    <header>
      <Navbar color="primary">
        <NavbarBrand tag={RouterNavLink} exact to="/" activeClassName="active">
          Reactstrap
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              activeClassname="active"
              to="/memory"
            >
              Memory
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              activeClassname="active"
              to="/pendu"
            >
              Pendu
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </header>
  );
}

export default Header;
