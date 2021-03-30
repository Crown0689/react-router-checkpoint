import React from 'react'
import {Link, Route, Switch} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

export default class Example extends React.Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  goToLogin = () => {
    console.log("history of Nav: " , this.props)
    this.props.history.push("/login")
  }

  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">ProfileHub</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          <Switch>
                <Route path ="/profile">
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                    <Link to="/login" className="nav-link">Logout</Link>
                    </NavItem>
                  </Nav>
                </Route>
                <Route>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                    <Link to="/login" className="nav-link">Login</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/signup" className="nav-link">Signup</Link>
                  </NavItem>
                  </Nav>
                </Route>
              </Switch>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}