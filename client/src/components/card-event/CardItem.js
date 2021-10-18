import React, { Fragment } from 'react';
import { Link }  from 'react-router-dom';
import moment from 'moment';

const CardItem = ({events, sortText, titleSize, textSize }) => {
    const renderedList = events
        .sort((a, b) => a.start.localeCompare(b.start))
            .filter(event => event.status === sortText)
                .map(filteredEvent => {
                    return (
                        <div key={filteredEvent._id} className="bg-white p-4 mb-2 rounded-xl shadow-md grid grid-flow-row auto-rows-max md:auto-rows-min h-auto w-full">
                            <div className="border-b-2 border-gray-300 w-full h-full ">
                                <Link to={`/events/${filteredEvent._id}`}><p className={`lg:${titleSize} md:text-md sm:text-sm font-bold hover:text-gray-500`}>{filteredEvent.title.toUpperCase()}</p></Link>
                                <p className={`lg:${textSize} md:text-sm sm:text-xs whitespace-normal`} >
                                    {filteredEvent.description}
                                </p>
                            </div>
                            <pre className={`lg:${textSize} md:text-sm sm:text-xs`}>
                                <pre>
                                    <b>Start:</b> { `${moment(filteredEvent.start).format("D-MM-YYYY, H:mm")}` }
                                </pre>
                                <pre>
                                    <b>End:</b> { `${moment(filteredEvent.end).format("D-MM-YYYY, H:mm")}` }
                                </pre>
                                <pre className="whitespace-normal">
                                    <b>Note:</b> <br/> {filteredEvent.note}
                                </pre>
                                <pre className="whitespace-normal">
                                    <b>Location:</b> <br/>{filteredEvent.location}
                                </pre>
                            </pre>
                            { filteredEvent.supports.map(support => {
                                return (
                                    <pre className={`lg:${textSize} md:text-sm sm:text-xs`} key={support.id}>
                                        <b>Support:</b> {support.name_support}
                                    </pre>
                                )
                            }) }
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