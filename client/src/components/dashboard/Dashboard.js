import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';
import Header from '../layout/Header';
import CardEvent from '../card-event/CardEvent';
import Calendar from '../calendar/Calendar';
import Alert from '../layout/Alert';

const Dashboard = ({
    getEvents,
    auth: { user },
    event: { events }
}) => {
    
    useEffect(() => {
        getEvents();
    }, [getEvents, events])

    return (
        <Fragment>
            <Header text={'Dasboard'} />
            
            <main>
                <div className="max-w-7xl mx-auto py-6">

                    <div className="greeting mb-4">
                        Welcome { user && user.name }
                    </div>

                    <Alert />

                    <CardEvent events={events} />

                    <Calendar events={events} />

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