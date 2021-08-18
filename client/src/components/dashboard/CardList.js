import React, { Fragment } from 'react';
import moment from 'moment';

const Table = ({ events }) => {
    const renderedListUpcoming = events.map(event => {
        return (
            <div key={event._id} className="bg-white h-10 p-2 mb-2 rounded-xl shadow-md grid grid-cols-3 gap-4 h-full">
                <p className="inline-block">{event.title}</p>
                <p className="inline-block text-xs">
                    { moment(event.start).format("L") !== moment(event.end).format("L") ? 
                        `${moment(event.start).format("L") - moment(event.end).format("L")}`  :
                        moment(event.start).format("L")
                    }
                </p>
                <p className="inline-block text-xs">{event.location}</p>
            </div>
        );
    });

    const renderedListOngoing = null;

    return (
        <Fragment>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="max-w-full rounded overflow-hidden bg-yellow-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg inline-block mb-2">Upcoming</div>
                    </div>
                    {events !== null ? (
                        <div className="bg-yellow-100 px-4 py-2">
                            {renderedListUpcoming}
                        </div>
                    ) : (
                        <div className="bg-yellow-100 px-4 py-2 h-full">
                            <p className="m-8 text-center">Not available</p>  
                        </div>
                    )}
                </div>
                <div className="max-w-full rounded overflow-hidden bg-green-200 rounded-xl">
                    <div className="px-6 py-4 text-center">
                        <div className="font-bold text-lg mb-2 devide">Ongoing</div>
                    </div>
                    {false ? (
                        <div className="bg-green-100 px-4 py-2">
                            {renderedListOngoing}
                        </div>
                    ) : (
                        <div className="bg-green-100 px-4 py-2 h-full">
                            <p className="m-8 text-center">Not available</p>  
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Table;