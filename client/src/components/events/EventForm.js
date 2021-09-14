import React, { Fragment, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent, getEventById, updateEvent } from '../../actions/event';
import Alert from '../layout/Alert';
import Header from '../layout/Header';
import moment from 'moment';

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
    updateEvent,
    history,
    match 
}) => {

    const [formData, setFormData] = useState(initialState);
    const creatingEvent = useRouteMatch('/create-event');
    const disableThePreviousDay = moment().format().slice(0, 16);

    useEffect(() => {
        if (!event) {
            getEventById(match.params.id);
        }

        if (!loading && event) {
            const eventData = { ...initialState };
            for (const key in event) {
                if (key in eventData) eventData[key] = event[key];
            }
            setFormData(eventData);
        }
    }, [loading, getEventById, match.params.id, event]);

    const {
        title,
        description,
        start,
        end,
        location,
        status
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!event) {
            createEvent(formData, history);
            setFormData('');
        }

        updateEvent(match.params.id, formData);
    };

    return (
        <Fragment> 
            <Header text={ creatingEvent ? 'Create Event' : 'Edit Event' } />

            <main>
                <div className="max-w-7xl mx-auto py-6 h-full">
                    <form className="px-10 py-2 border rounded-lg bg-white" onSubmit={onSubmit}>
                        <div className="text-center font-bold text-lg leading-7 text-gray-900 sm:text-2xl sm:truncate mb-4">
                            Event Form
                        </div>
                        <Alert />
                        <div className="grid lg:grid-cols-2 md:grid-rows-auto lg:grid-rows-auto gap-4">
                            <div className="grid grid-rows-3">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Title
                                    </label>
                                    <input 
                                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                        name="title"
                                        id="title" 
                                        type="text" 
                                        placeholder="Vaksin Untuk Indonesia" 
                                        value={title}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <input 
                                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                        name="description"
                                        id="description" 
                                        type="textarea" 
                                        rows="3" 
                                        placeholder="Event Produksi" 
                                        value={description}
                                        onChange={onChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                        Location
                                    </label>
                                    <input 
                                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                        name="location"
                                        id="location" 
                                        type="text" 
                                        placeholder="Studio 2" 
                                        value={location}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-rows-2">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
                                        Start
                                    </label>
                                    <input 
                                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                        name="start"
                                        id="start" 
                                        type="datetime-local" 
                                        value={start}
                                        onChange={onChange}
                                        min={disableThePreviousDay}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end">
                                        End
                                    </label>
                                    <input 
                                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                        name="end"
                                        id="end" 
                                        type="datetime-local" 
                                        value={end}
                                        onChange={onChange}
                                        min={disableThePreviousDay}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                        Status
                                    </label>
                                    <input 
                                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                                        name="status"
                                        id="status" 
                                        type="text" 
                                        value={status}
                                        onChange={onChange}
                                        disabled
                                        placeholder="new"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                { creatingEvent ? 'Submit' : 'Save' }
                            </button>
                        </div>
                    </form>
                </div>
            </main>

        </Fragment>
    )
}

EventForm.propTypes = {
    createEvent: PropTypes.func.isRequired,
    getEventById: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    event: state.event
});

export default connect(mapStateToProps, { createEvent, getEventById, updateEvent })(
    EventForm
);