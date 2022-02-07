import {
  TEST2_SET_DATA
} from "../actions/test2Actions"

const initialState = {
  data: "This is test 2 page"
}

function test2Reducer(state = initialState, action) {
  switch(action.type) {
    case TEST2_SET_DATA: {
      return {
        ...state,
        data: action.data
      }
    }

    default: 
      return state
  }
}

export default test2Reducer