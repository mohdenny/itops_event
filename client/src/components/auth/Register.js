import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert'
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
            <div className="bg-white p-8 grid grid-cols-2 rounded-lg">
                <div className="information border-r-2">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Create Your Account</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Make sure the information here is valid
                        </p>
                    </div>
                </div>
                <div className="form-register">
                    <Alert />
                    <form className="w-full max-w-lg" onSubmit={onSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input 
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    name="name"
                                    id="name" 
                                    type="text" 
                                    placeholder="Jane" 
                                    value={name}
                                    onChange={onChange}
                                />
                                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    autoComplete="email" 
                                    placeholder="jane@gmail.com" 
                                    value={email}
                                    onChange={onChange}
                                />
                                <p className="text-gray-600 text-xs italic">Enter a valid email</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="password" 
                                    type="password" 
                                    placeholder="******************" 
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                />
                                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password2">
                                    Confirm Password
                                </label>
                                <input 
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="password2" 
                                    type="password" 
                                    placeholder="******************" 
                                    name="password2"
                                    value={password2}
                                    onChange={onChange}
                                />
                                <p className="text-gray-600 text-xs italic">Please confirm the password as above</p>
                            </div>
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
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