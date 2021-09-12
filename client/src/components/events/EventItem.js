import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../layout/Alert';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, deleteEvent } from '../../actions/event';

const EventItem = ({ events, updateStatus, deleteEvent }) => {
    const [status, setStatus] = useState();

    useEffect(() => {
        setStatus({status: 'done'});
    },[])

    const setColorStatus = status => {
        switch (status) {
            case '':
                return 'bg-yellow-200 text-yellow-800';
            case 'upcoming':
                return 'bg-green-200 text-green-800';
            case 'ongoing':
                return 'bg-blue-200 text-blue-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    }

    const formatDate = event => {
        return moment(event).format("D-MM-YYYY, H:mm")
    }

    const warningRequired = (event, color, text)  => {
        if( event.items && event.items.length === 0 && event.supports && event.supports.length === 0 ) {
            return(
                <p className={`*font-extralight italic text-xs text-${color}-900`}>
                    {text}
                </p>
            )
        }
    }

    const warningStatus = (event, status, color, text) => {
        if( event.status === status ) {
            return (
                <p className={`*font-extralight italic text-xs text-${color}-900`}>
                    {text}
                </p> 
            )
        }
    }

    const renderedList = events.map(event => {
        return (
            <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                <Link to={`/events/${event._id}`} className="text-lg hover:text-gray-500">
                                    {event.title}
                                </Link>
                                
                                {warningRequired(event, 'yellow', 'Items and Support are required!')}
                                {warningStatus(event, 'upcoming', 'green', 'This event is Upcoming!')}
                                {warningStatus(event, 'ongoing', 'blue', 'Cannot be edited during this event Ongoing!')}
                                {warningStatus(event, 'done', 'gray', 'This event has ended!')}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ `Start: ${formatDate(event.start)}` } </div>
                    <div className="text-sm text-gray-900">{ `End: ${formatDate(event.end)}` } </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`${setColorStatus(event.status)} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                        {event.status === '' ? 'new' : event.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(event.date)} </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {
                        event.status === 'ongoing' ?   
                            (<button onClick={() => updateStatus(event._id, status)} type="button" className={`ml-2 p-1 bg-gray-500 rounded-md text-white hover:bg-gray-800 hover:text-gray-200`} >Done</button>) 
                        :
                            (<Link to={`/events/event/${event._id}`} className={`${event.status === 'done' ? 'hidden' : '' } ml-2 p-1 bg-indigo-500 rounded-md text-white hover:bg-indigo-800 hover:text-gray-200`}>Edit</Link>)
                    }

                    <button onClick={() => deleteEvent(event._id)} type="button" className="ml-2 p-1 bg-red-500 rounded-md text-white hover:bg-red-800 hover:text-gray-200">Delete</button>
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
            <div className="flex flex-col">
                <div className="-my-2 px-8 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 bg-white sm:rounded-lg">
                        <Alert />
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Schedule
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {renderedList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

EventItem.propTypes = {
    updateStatus: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired
}

export default connect(null, { updateStatus, deleteEvent } )(EventItem);