import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../hooks/Pagination/Pagination';
import Alert from '../layout/Alert';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, deleteEvent } from '../../actions/event';
import { PDFDownloadLink  } from '@react-pdf/renderer';
import PdfDocument from '../pdf/PdfDocument';

let PageSize = 10;

const EventItem = ({ events, updateStatus, deleteEvent }) => {
    const [filterEvent, setFilterEvent] = useState(events);
    const [currentPage, setCurrentPage] = useState(1);
    const [option, setOption] = useState('');
    const [sortTerm, setSortTerm] = useState('start');

    useEffect(() => {
        const sortingEvent = () => {
            switch(option){
                case 'newCreated':
                    return setSortTerm('date')
                default:
                    return setSortTerm('start')
                // case 'lastCreated'
                // case 'newEdited'
                // case 'lastEdited'
                // case 'asce'
                // case 'desc'
            } 
        }

        sortingEvent()
        
        console.log(option)
    }, [option])

    const setColorStatus = status => {
        switch (status) {
            case 'new':
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
        if( event.items.length === 0 || event.supports.length === 0 ) {
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

    const checkStatus = (events, text) => {
        const matching = () => 
            events.forEach(event => {
                return event.status.includes(text)
            })

        if (matching){
            setFilterEvent(events.filter(event => event.status === text))
        }

        console.log(filterEvent)
    }

    const filterButton = (text) => {
        checkStatus(events, text)
    }

    const renderedFilterButton = (events, text, color) => {
        return (
            <div>
                <button className={`border rounded-md p-1 bg-${color}-200 text-${color}-800 hover:bg-${color}-800 hover:text-${color}-200`} onClick={() => filterButton(text)} type="button">
                    {text}
                    <span className={`ml-1 px-1 border rounded-md bg-${color}-400 text-${color}-100`}>{events.filter(event => event.status === text).length}</span>
                </button>
            </div>
        )
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        // return filterEvent.slice(firstPageIndex, lastPageIndex);
        return events.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, events]);


    const renderedList = currentTableData.sort((a, b) => b.date.localeCompare(a.date)).map(event => {
        return (
            <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                <Link to={`/events/${event._id}`} className="text-base hover:text-gray-500">
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
                        {event.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(event.date)} </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.edited === null ? '-' : formatDate(event.edited)} </div>
                </td> */}
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {
                        event.status === 'ongoing' ?   
                            (<button onClick={() => {updateStatus(event._id, {status: 'done'})}} type="button" className="ml-2 p-1 bg-gray-500 rounded-md text-white font-semibold hover:bg-gray-800 hover:text-gray-200" >Done</button>) 
                        :
                            (<Link to={`/events/event/${event._id}`} className={`${event.status === 'done' ? 'hidden' : '' } ml-2 p-1 bg-indigo-500 rounded-md text-white hover:bg-indigo-800 hover:text-gray-200`}>Edit</Link>)
                    }

                    {
                        event.status !== 'ongoing' && event.status !== 'done' && <button onClick={() => {deleteEvent(event._id)}} type="button" className="ml-2 p-1 bg-red-500 rounded-md text-white font-semibold hover:bg-red-800 hover:text-gray-200">Delete</button>
                    }

                    <PDFDownloadLink 
                        document={<PdfDocument event={event} />}
                        fileName={`${event.title}.pdf`}
                        className="ml-2 p-1 bg-yellow-500 rounded-md text-white hover:bg-yellow-800 hover:text-yellow-200"
                    >
                        PDF
                    </PDFDownloadLink >
                    
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
                            <div className="grid grid-cols-5 gap-4 justify-items-center mb-2">     
                                {/* {renderedFilterButton(events, 'new', 'yellow')}
                                {renderedFilterButton(events, 'upcoming', 'green')}
                                {renderedFilterButton(events, 'ongoing', 'blue')}
                                {renderedFilterButton(events, 'done', 'gray')}
                                <div className="w-full px-3">
                                    <div className="relative w-full ">
                                        <div className="w-auto">
                                            <select value={option.value} onChange={(e) => setOption(e.target.value)} className="inline-block appearance-none w-auto bg-gray-200 border border-gray-200 text-gray-700 py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                <option value=''>None Select</option>
                                                <option value='newCreated'>New Created</option>
                                                <option value='lastCreated'>Last Created</option>
                                                <option value='newEdited'>New Edited</option>
                                                <option value='lastEdited'>Last Edited</option>
                                                <option value='asce'>A - Z</option>
                                                <option value='desc'>Z - A</option>
                                            </select>
                                        </div>
                                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="border rounded-md p-1 bg-red-100 text-red-500 hover:bg-red-800 hover:text-red-200" onClick={() => setFilterEvent(events)} type="button">Clear Filter</button>
                                </div> */}
                            </div>
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
                                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Edited
                                        </th> */}
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {renderedList}
                                </tbody>
                            </table>
                            <Pagination
                                className="container"
                                currentPage={currentPage}
                                totalCount={filterEvent.length}
                                pageSize={PageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
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