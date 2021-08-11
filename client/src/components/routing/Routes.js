import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

const Routes = props => {
    return (
        <div className='bg-gradient-to-r from-blue-400 to-gray-300 w-full h-full'>
            <section className='container mx-auto p-8'>
                <Switch>
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </section>
        </div>
    );
};

export default Routes;