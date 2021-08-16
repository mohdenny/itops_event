import api from '../utils/api';
import { setAlert } from './alert';
import { GET_EVENT, GET_EVENTS, EVENT_ERROR } from './types';

// Get events
export const getEvents = () => async dispatch => {
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
    }
}