import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = () => {
    return (
        <Fragment>
            <header>
                <div class="max-w-7xl mx-auto">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1><br />
                    <hr/>
                </div>
            </header>
            
            <main>
                <div class="max-w-7xl mx-auto py-6">
                
                    <div class="px-4 py-6 sm:px-0">
                        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                    </div>

                </div>
            </main>
        </Fragment>
    );
};

export default Dashboard;