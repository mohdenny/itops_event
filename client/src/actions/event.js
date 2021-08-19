import api from '../utils/api';
import { setAlert } from './alert';
import { GET_EVENT, GET_EVENTS, EVENT_ERROR, CLEAR_EVENT } from './types';

// Get all events
export const getEvents = () => async dispatch => {
    dispatch({ type: CLEAR_EVENT });

    try {
        const res = await api.get('/events');

        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    };
};

// Get event by ID
export const getEventById = (eventId) => async (dispatch) => {
    try {
        if (eventId) {
            const res = await api.get(`/events/${eventId}`);

            dispatch({
                type: GET_EVENT,
                payload: res.data
            });
        }

    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or update event
export const createEvent = ( formData, history, edit = false ) => async (dispatch) => {
    try {
        const res = await api.post('/events', formData);

        dispatch({
            type: GET_EVENT,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'blue'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
        }

        dispatch({
            type: EVENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};