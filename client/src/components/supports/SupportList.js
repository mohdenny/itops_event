import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSupport } from '../../actions/event';

const SupportList = ({ event: { event } , supports , deleteSupport }) => {
    const renderedList = supports.map(support => {
        return (
            <tr key={support._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {support.name_support}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {   
                        event.status !== 'done' && event.status !=='ongoing' &&
                            (
                                <button onClick={() => deleteSupport(event._id, support._id)} type="button" className="ml-2 p-1 bg-red-500 rounded-md text-white font-semibold hover:bg-red-800 hover:text-gray-200">Delete</button>
                            )
                    }
                </td>
            </tr>
        )
    })

    return (
        <Fragment>
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

SupportList.propTypes = {
    deleteSupport: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, { deleteSupport })(SupportList);