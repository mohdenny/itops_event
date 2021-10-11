import React, { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardEvent from '../card-event/CardEvent';
import { getEventsGuest } from '../../actions/event';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Services from '../services/Services';

const Landing = ({ event: { events }, getEventsGuest }) => {
    const location = useLocation();

    useEffect(() => {
        getEventsGuest();
    }, [getEventsGuest, events])

    return (
        <Fragment>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-6 px-6 h-screen">
                    <div className="p-4 bg-white rounded-lg">
                        <div className="grid lg:grid-cols-2 md:grid-rows-auto sm:grid-rows-auto gap-4">
                            <CardEvent path={location.pathname} events={events} title={'upcoming'} sortText={'upcoming'} color={'green'} high={'h-full'} highBody={'h-full'} />
                            <CardEvent path={location.pathname} events={events} title={'ongoing'} sortText={'ongoing'} color={'blue'} high={'h-full'} highBody={'h-full'}/>
                        </div>
                    </div>
                </div>
            </div>
            <Services events={events} />
        </Fragment>
    )
} 

Landing.propTypes = ({
    getEventsGuest: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
});

const mapStateToProps = state => ({
    event: state.event
});


export default connect(mapStateToProps, { getEventsGuest })(Landing);