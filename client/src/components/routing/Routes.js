import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import EventForm from '../event-forms/EventForm';

const Routes = props => {
    return (
        <section className='container mx-auto p-8'>
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create-event' component={EventForm} />
            </Switch>
        </section>
    );
};

export default Routes;