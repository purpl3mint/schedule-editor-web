import {
  TEST_SET_DATA,
  TEST_SET_FORM
} from "../actions/testActions"

const initialState = {
  data: "This is test page",
  updateForm: {
    newData: ""
  }
}

function testReducer(state = initialState, action) {
  switch(action.type) {
    case TEST_SET_DATA: {
      return { ...state,  data: state.updateForm.newData }
    }
    case TEST_SET_FORM: {
      const newUpdateForm = {...state.updateForm, [action.data.name]: action.data.value}
      return { ...state, updateForm: newUpdateForm }
    }

    default: 
      return state
  }
}

export default testReducer