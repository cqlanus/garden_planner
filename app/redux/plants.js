// @flow
import axios from 'axios';

type State = {
    plants: Array<mixed>,
    isWorking: boolean
};

type Action = {
    type: string,
    plants?: Array<mixed>
};

// INITIAL STATE
const initialState = {
    plants: [],
    isWorking: false
};

// ACTION TYPES
const SET_PLANTS_STARTED = 'SET_PLANTS_STARTED';
const SET_PLANTS_COMPLETE = 'SET_PLANTS_COMPLETE';
const SET_PLANTS_FAILED = 'SET_PLANTS_FAILED';

// ACTION CREATORS
const setPlantsStarted = (): Action => ({ type: SET_PLANTS_STARTED });
const setPlantsCompleted = (plants: Array<mixed>): Action => ({
    type: SET_PLANTS_COMPLETE,
    plants
});

// THUNK CREATORS
export const getPlants = () => (dispatch: any) => {
    dispatch(setPlantsStarted());
    return axios
        .get('https://crops-api.herokuapp.com/api/crops')
        .then(res => res.data)
        .then(plants => dispatch(setPlantsCompleted(plants)))
        .catch(console.log);
};
// REDUCER
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
    case SET_PLANTS_STARTED:
        return { ...state, isWorking: true };
    case SET_PLANTS_COMPLETE:
        return { ...state, plants: action.plants, isWorking: false };
    default:
        return state;
    }
};
