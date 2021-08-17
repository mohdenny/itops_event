import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';
import MyCalendar from './MyCalendar';

const Dashboard = ({
    getEvents,
    auth: { user },
    event: { events }
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
                
                    <div className="greeting mb-4">
                        Welcome { user && user.name }
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="max-w-sm rounded overflow-hidden bg-yellow-200 hover:bg-yellow-300 rounded-xl">
                            <div className="px-6 py-4 text-center">
                                <div className="font-bold text-lg mb-2">12</div>
                                <p className="text-gray-700 text-base">
                                    Upcoming
                                </p>
                            </div>
                        </div>
                        <div className="max-w-sm rounded overflow-hidden bg-green-200 hover:bg-green-300 rounded-xl">
                            <div className="px-6 py-4 text-center">
                                <div className="font-bold text-lg mb-2 devide">3</div>
                                <p className="text-gray-700 text-base">
                                    Ongoing
                                </p>
                            </div>
                        </div>
                        <div className="max-w-sm rounded overflow-hidden bg-gray-200 hover:bg-gray-300 rounded-xl">
                            <div className="px-6 py-4 text-center">
                                <div className="font-bold text-lg mb-2">23</div>
                                <p className="text-gray-700 text-base">
                                    Done
                                </p>
                            </div>
                        </div>
                    </div>

                    <MyCalendar events={events} />

                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                Jane Cooper
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                jane.cooper@example.com
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
                                                    <div className="text-sm text-gray-500">Optimization</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    Admin
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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