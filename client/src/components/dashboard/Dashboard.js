import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';
import Header from '../layout/Header';
import CardEvent from '../card-event/CardEvent';
import MyCalendar from '../calendar/MyCalendar';
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
                    <div className="grid grid-rows-2 gap-2 bg-white p-4 max-h-full">
                        <CardEvent events={events} />
                        <div className="grid grid-cols-2 gap-4">
                            <MyCalendar />
                            <MyCalendar />
                        </div>
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