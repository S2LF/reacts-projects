import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <header>
      <Navbar color="primary">
        <NavbarBrand tag={RouterNavLink} exact to="/" activeClassName="active">
          Mes Projets
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              activeClassName="active"
              to="/memory"
            >
              Memory
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RouterNavLink}
              exact
              activeClassName="active"
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
