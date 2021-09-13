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
                    <div className="grid grid-flow-col grid-cols-2 grid-rows-auto gap-4 p-4 bg-white rounded-lg max-w-full">
                        <div className="grid grid-flow-col lg:grid-cols-2 lg:grid-rows-2 md:grid-cols-1 md:grid-rows-4 gap-4 mb-4">
                            <CardEvent events={events} title={'new'} sortText={''} color={'yellow'} high={'h-full'} highBody={'max-h-64'} />
                            <CardEvent events={events} title={'ongoing'} sortText={'ongoing'} color={'blue'} high={'h-full'} highBody={'max-h-64'} />
                            <CardEvent events={events} title={'upcoming'} sortText={'upcoming'} color={'green'} high={'h-full'} highBody={'max-h-64'} />
                            <CardEvent events={events} title={'done'} sortText={'done'} color={'gray'} high={'h-full'} highBody={'max-h-64'} />
                        </div>
                        <div className="grid grid-flow-col lg:grid-cols-auto lg:grid-rows-1 gap-4">
                            <MyCalendar events={events} />
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