import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';

const Routes = props => {
    return (
        <div className='bg-gradient-to-r from-blue-400 to-gray-300 w-full h-screen'>
            <section className='container mx-auto p-8'>
                <Switch>
                    <Route exact path='/register' component={Register} />
                </Switch>
            </section>
        </div>
    );
};

export default Routes;