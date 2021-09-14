import React, { Fragment } from 'react';
import { Link }  from 'react-router-dom';
import moment from 'moment';

const CardItem = ({events, sortText, titleSize, textSize }) => {
    const renderedList = events
        .sort((a, b) => a.start.localeCompare(b.start))
            .filter(event => event.status === sortText)
                .map(filteredEvent => {
                    return (
                        <div key={filteredEvent._id} className="bg-white p-4 mb-2 rounded-xl shadow-md grid grid-flow-row auto-rows-max md:auto-rows-min">
                            <Link to={`/events/${filteredEvent._id}`}><p className={`lg:${titleSize} md:text-md sm:text-sm font-bold hover:text-gray-500 border-b-2 border-gray-300`}>{filteredEvent.title}</p></Link>
                            <pre className={`lg:${textSize} md:text-sm sm:text-xs`}>
                                Start: { `${moment(filteredEvent.start).format("D-MM-YYYY, H:mm")}` }
                                <pre>
                                End: { `${moment(filteredEvent.end).format("D-MM-YYYY, H:mm")}` }
                                </pre>
                            </pre>
                            <p className={`lg:${textSize} md:text-sm sm:text-xs`}>{filteredEvent.location}</p>
                        </div>
                    );
                });

    return (
        <Fragment>
            {renderedList}
        </Fragment>
    )
}

export default CardItem;