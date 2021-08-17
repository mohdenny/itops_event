import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'red');
        } else {
            register({ name, email, password });
        }
    };
    
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="w-full max-w-xs m-auto">
                <form className="bg-white shadow-lg rounded border px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-4">
                        Sign up
                    </h2>
                    <Alert />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                            name="name"
                            id="name" 
                            type="text" 
                            placeholder="Jane" 
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            type="email" 
                            name="email" 
                            id="email" 
                            autoComplete="email" 
                            placeholder="jane@gmail.com" 
                            value={email}
                            onChange={onChange}
                        />
                        <p className="text-xs italic">Enter a valid email</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password" 
                            placeholder="******************" 
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Confirm Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password2" 
                            type="password2" 
                            placeholder="******************" 
                            name="password2"
                            value={password2}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-400 text-xs">
                    &copy;2021 Ynnedhom. All rights reserved.
                </p>
            </div>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
  
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
  
export default connect(mapStateToProps, { setAlert, register })(Register);