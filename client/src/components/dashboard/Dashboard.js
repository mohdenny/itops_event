import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';

const Dashboard = ({
    getEvents,
    auth: { user },
    event: { event }
}) => {
    
    useEffect(() => {
        getEvents();
    }, [getEvents])

    return (
        <Fragment>
            <header>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>
            
            <main>
                <div className="max-w-7xl mx-auto py-6">
                
                    <div className="px-4 py-6 sm:px-0">
                        Welcome { user && user.name }
                    </div>

                </div>
            </main>
        </Fragment>
    );
};

Dashboard.propTypes = {
    getEvents: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    event: state.event
})

export default connect(mapStateToProps, { getEvents })(Dashboard);