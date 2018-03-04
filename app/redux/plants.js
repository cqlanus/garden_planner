import axios from "axios"

// INITIAL STATE
const initialState = {
  plants: [],
  isWorking: false,
}

// ACTION TYPES
const SET_PLANTS_STARTED = "SET_PLANTS_STARTED"
const SET_PLANTS_COMPLETE = "SET_PLANTS_COMPLETE"
const SET_PLANTS_FAILED = "SET_PLANTS_FAILED"

// ACTION CREATORS
const setPlantsStarted = () => ({ type: SET_PLANTS_STARTED })
const setPlantsCompleted = plants => ({ type: SET_PLANTS_COMPLETE, plants })

// THUNK CREATORS
export const getPlants = () => dispatch => {
  dispatch(setPlantsStarted())
  return axios.get('https://crops-api.herokuapp.com/api/crops')
  .then(res => res.data)
  .then(plants => dispatch(setPlantsCompleted(plants)))
  .catch(console.log)
}
// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PLANTS_STARTED:
      return {...state, isWorking: true }
    case SET_PLANTS_COMPLETE:
      return {...state, plants: action.plants, isWorking: false }
    default:
      return state
  }
}