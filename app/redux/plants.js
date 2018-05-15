// @flow
import axios from 'axios'
import { api } from '../api/APIManager'

type State = {
    plants: Array<mixed>,
    isWorking: boolean,
}

type Action = { type: string } | { type: string, plants: Array<mixed> }

// INITIAL STATE
const initialState = {
    plants: [],
    isWorking: false,
}

// ACTION TYPES
const SET_PLANTS_STARTED = 'SET_PLANTS_STARTED'
const SET_PLANTS_COMPLETE = 'SET_PLANTS_COMPLETE'
const SET_PLANTS_FAILED = 'SET_PLANTS_FAILED'

// ACTION CREATORS
const setPlantsStarted = (): Action => ({ type: SET_PLANTS_STARTED })
const setPlantsCompleted = (plants: Array<mixed>): Action => ({
    type: SET_PLANTS_COMPLETE,
    plants,
})

// THUNK CREATORS
export const getPlants = () => async (dispatch: any) => {
    dispatch(setPlantsStarted())
    try {
        const plants = await api.plantService.getAll()
        dispatch(setPlantsCompleted(plants))
    } catch (error) {
        console.log(error)
    }
}
// REDUCER
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
    case SET_PLANTS_STARTED:
        return { ...state, isWorking: true }
    case SET_PLANTS_COMPLETE:
        return { ...state, plants: action.plants, isWorking: false }
    default:
        return state
    }
}
