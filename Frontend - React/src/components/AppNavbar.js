import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/registerModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

import {loadUser} from '../actions/authActions'
import store from '../store'

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  componentDidMount(){
    store.dispatch(loadUser())
    // const { isAuthenticated, user } = this.props.auth;
    // console.log(store.getState())
}
  render() {
    const { isAuthenticated, user } = this.props.auth;
    // console.log("Navbar "+this.props.auth)
    // console.log(user)
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>

        <NavItem>
        <NavLink href='/dashboard'>
                    Dashboard
                </NavLink>
        </NavItem>

        <NavItem>
          <Logout />
        </NavItem>

      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Container>
        <Navbar color='dark' dark expand='sm' className='mb-5' fixed='top'>
          <Container>
            <NavbarBrand href='/'>AnsMyQuery</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);