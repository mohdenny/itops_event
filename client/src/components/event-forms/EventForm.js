import React, { Fragment, useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent, getEventById } from '../../actions/event'; 

const initialState = {
    title: '',
    description: '',
    start: '',
    end: '',
    location: '',
    status: ''
}

const EventForm = ({ 
    event: { event, loading },
    createEvent,
    getEventById,
    history 
}) => {
    const [formData, setFormData] = useState(initialState);

    const creatingEvent = useRouteMatch('/create-event');

    useEffect(() => {
        if (!event) getEventById();
        if (!loading && event) {
            const eventData = { ...initialState };
            for (const key in event) {
                if (key in eventData) eventData[key] = event[key];
            }
            setFormData(eventData);
        }
    }, [loading, getEventById, event]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createEvent(formData, history, event ? true : false);
    };

    return (
        <Fragment> 
            <p>
            { creatingEvent ? 'Create Event' : 'Edit Event' }
            </p>
        </Fragment>
    )
}

EventForm.propTypes = {
    createEvent: PropTypes.func.isRequired,
    getEventById: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    event: state.event
});

export default connect(mapStateToProps, { createEvent, getEventById })(
    EventForm
);