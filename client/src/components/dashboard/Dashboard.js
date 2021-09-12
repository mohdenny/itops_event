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
                    <div className="bg-white rounded-lg p-4 max-h-full">
                        <Alert />
                        <div className="grid lg:grid-cols-4 md:grid-rows-auto sm:grid-rows-auto gap-4 mb-4">
                            <CardEvent events={events} title={'new'} sortText={''} color={'yellow'} high={'h-full'} highBody={'max-h-64'} />
                            <CardEvent events={events} title={'upcoming'} sortText={'upcoming'} color={'green'} high={'h-full'} highBody={'max-h-64'} />
                            <CardEvent events={events} title={'ongoing'} sortText={'ongoing'} color={'blue'} high={'h-full'} highBody={'max-h-64'} />
                            <CardEvent events={events} title={'done'} sortText={'done'} color={'gray'} high={'h-full'} highBody={'max-h-64'} />
                        </div>
                        <div className="grid lg:grid-cols-2 md:grid-rows-auto gap-4">
                            <MyCalendar events={events} />
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