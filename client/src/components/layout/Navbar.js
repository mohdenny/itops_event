import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLeftLinks = (
    <Fragment>
      <Link to="/dashboard" className="bg-gray-400 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</Link>
      <Link to="/newevent" className="text-gray-500 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">New Event</Link>
      <Link to="/allevent" className="text-gray-500 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">All Event</Link>
    </Fragment>
  );

  const authRigthLinks = (
    <a onClick={logout} href="#!" className="to-gray-200 p-1 rounded-full text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200 focus:ring-gray-200">
      <span className="sr-only">Logout</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    </a>
  );

  const guestLeftLinks = (
    <Link to="/allevent" className="text-gray-500 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">All Event</Link>
  );

  const guestRigthLinks = (
    <Fragment>
      <Link to="/register" className="text-gray-500 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">Register</Link>
      <Link to="/login" className="text-gray-500 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">Login</Link>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-black-400 hover:text-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                
                  {isAuthenticated ? authLeftLinks : guestLeftLinks}

                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">

                {isAuthenticated ? authRigthLinks : guestRigthLinks}
                
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="bg-gray-400 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

            <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-black block px-3 py-2 rounded-md text-base font-medium">Team</a>

            <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-black block px-3 py-2 rounded-md text-base font-medium">Projects</a>

            <a href="#" className="text-gray-500 hover:bg-gray-200 hover:text-black block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);