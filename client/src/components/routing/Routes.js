import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Events from '../events/Events';
import EventForm from '../events/EventForm';
import EventDetail from '../events/EventDetail';

const Routes = props => {
    return (
        <section className="bg-gray-200">
            <div className='container mx-auto p-8'>
                <Switch>
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute exact path='/create-event' component={EventForm} />
                    <PrivateRoute exact path='/events' component={Events} />
                    <PrivateRoute exact path='/events/:id' component={EventDetail} />
                    <PrivateRoute exact path='/events/event/:id' component={EventForm} />
                </Switch>
            </div>
        </section>
    );
};

export default Routes;