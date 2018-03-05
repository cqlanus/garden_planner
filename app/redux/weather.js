import axios from 'axios';

// INITIAL STATE
const initialState = {
    station: {},
    zip: null,
    isWorking: false
};

// ACTION TYPES
const SET_STATION_STARTED = 'SET_STATION_STARTED';
const SET_STATION_COMPLETE = 'SET_STATION_COMPLETE';
const SET_STATION_FAILED = 'SET_STATION_FAILED';

// ACTION CREATORS
const setStationStarted = () => ({ type: SET_STATION_STARTED });
const setStationCompleted = station => ({
    type: SET_STATION_COMPLETE,
    station
});

// THUNK CREATORS
export const getWeatherNorms = zip => dispatch => {
    dispatch(setStationStarted());
    axios
        .get(`https://weather-norms.herokuapp.com/api/weather/zip/${zip}`)
        .then(res => res.data)
        .then(station => dispatch(setStationCompleted(station)))
        .catch(console.log);
};

// REDUCER
export default function(state = initialState, action) {
    switch (action.type) {
    case SET_STATION_STARTED:
        return { ...state, isWorking: true };
    case SET_STATION_COMPLETE:
        return { ...state, station: action.station, isWorking: false };
    default:
        return state;
    }
}
