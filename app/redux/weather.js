// @flow
import axios from 'axios'
import { api } from '../api/APIManager'

type State = {
    station: {},
    zip: mixed,
    isWorking: boolean,
}

type Action = { type: string } | { type: string, station: mixed }

// INITIAL STATE
const initialState: State = {
    station: {},
    zip: null,
    isWorking: false,
}

// ACTION TYPES
const SET_STATION_STARTED = 'SET_STATION_STARTED'
const SET_STATION_COMPLETE = 'SET_STATION_COMPLETE'
const SET_STATION_FAILED = 'SET_STATION_FAILED'

// ACTION CREATORS
const setStationStarted = (): Action => ({ type: SET_STATION_STARTED })
const setStationCompleted = (station: {}): Action => ({
    type: SET_STATION_COMPLETE,
    station,
})

// THUNK CREATORS
export const getWeatherNorms = (zip: string) => async (dispatch: any) => {
    dispatch(setStationStarted())
    try {
        const station = await api.weatherService.getStation(zip)
        dispatch(setStationCompleted(station))
    } catch (error) {
        console.log(error)
    }
}

// REDUCER
export default function(state: State = initialState, action: Action): State {
    switch (action.type) {
    case SET_STATION_STARTED:
        return { ...state, isWorking: true }
    case SET_STATION_COMPLETE:
        return { ...state, station: action.station, isWorking: false }
    default:
        return state
    }
}
