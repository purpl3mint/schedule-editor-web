import {
  TICKER_SET_SUCCEED,
  TICKER_SET_TICKERS,
  TICKER_SET_PRELOADER,
  TICKER_SET_ADD_FORM,
  TICKER_CLEAR_ADD_FORM,
  TICKER_SET_EDIT_FORM,
  TICKER_CLEAR_EDIT_FORM
} from "../actions/tickerActions"

const initialState = {
  isSucceed: false,
  tickers: [],
  preloader: false,
  addForm: {
    name: "",
    userId: 1,
    url: "",
    size: 24,
    speed: 80,
    font_color: "#ffffff",
    background_color: "#000000",
  },
  editForm: {
    id: 0,
    name: "",
    size: 24,
    speed: 80,
    font_color: "#ffffff",
    background_color: "#000000"
  }
}

function tickerReducer (state = initialState, action) {
  switch(action.type){
    case TICKER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case TICKER_SET_TICKERS:
      return { ...state, tickers: action.data }
    case TICKER_SET_PRELOADER:
      return { ...state, preloader: action.data}
    case TICKER_SET_ADD_FORM: {
        let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
        return { ...state, addForm: newAddForm }
    }
    case TICKER_CLEAR_ADD_FORM:
      return { ...state, addForm: initialState.addForm }
    case TICKER_SET_EDIT_FORM: {
        let newEditForm = {...state.editForm, [action.data.name]: action.data.value}
        return { ...state, editForm: newEditForm }
    }
    case TICKER_CLEAR_EDIT_FORM:
      return { ...state, editForm: initialState.editForm }

    default: 
      return state
  }
}

export default tickerReducer