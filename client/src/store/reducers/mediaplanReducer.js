import {
  MEDIAPLAN_SET_SUCCEED,
  MEDIAPLAN_SET_MEDIAPLANS,
  MEDIAPLAN_SET_PRELOADER,
  MEDIAPLAN_SET_ADD_FORM,
  MEDIAPLAN_CLEAR_ADD_FORM,
  MEDIAPLAN_SET_CURRENT,
  MEDIAPLAN_SET_MEDIAPLAN,

  MEDIAPLAN_SET_EDIT_OPTIONS_FORM,
  MEDIAPLAN_CLEAR_EDIT_OPTIONS_FORM,

  MEDIAPLAN_SET_EDIT_CONTENT_FORM,
  MEDIAPLAN_CLEAR_EDIT_CONTENT_FORM,
  MEDIAPLAN_SET_CONTENT_LIST,
  MEDIAPLAN_CLEAR_CONTENT_LIST,

  MEDIAPLAN_SET_EDIT_TICKER_FORM,
  MEDIAPLAN_CLEAR_EDIT_TICKER_FORM,
  MEDIAPLAN_SET_TICKER_LIST,
  MEDIAPLAN_CLEAR_TICKER_LIST,

  MEDIAPLAN_SET_EDIT_BANNER_FORM,
  MEDIAPLAN_CLEAR_EDIT_BANNER_FORM,
  MEDIAPLAN_SET_BANNER_LIST,
  MEDIAPLAN_CLEAR_BANNER_LIST,

  MEDIAPLAN_SET_EDIT_ADS_FORM,
  MEDIAPLAN_CLEAR_EDIT_ADS_FORM,
  MEDIAPLAN_SET_ADS_LIST,
  MEDIAPLAN_CLEAR_ADS_LIST,

  MEDIAPLAN_PUT_TIMELINE_CONTENT,
  MEDIAPLAN_REMOVE_TIMELINE_CONTENT,
  MEDIAPLAN_RESET_TIMELINE_CONTENT,

  MEDIAPLAN_PUT_TIMELINE_BANNER,
  MEDIAPLAN_REMOVE_TIMELINE_BANNER,
  MEDIAPLAN_RESET_TIMELINE_BANNER,
} from "../actions/mediaplanActions"

const initialState = {
  isSucceed: false,
  mediaplans: [],
  preloader: false,
  addForm: {
    name: "",
    userId: 1,
    ads_start_delay: 0,
    banners_start_delay: 0,
    banners_repeat: false,
    banners_animation_duration_msec: 0,
    contentId: 1,
  },
  editOptionsForm: {
    name: "",
    ads_start_delay: 0,
    banners_start_delay: 0,
    banners_repeat: false,
    banners_animation_duration_msec: 0
  },
  editContentForm: {
    id: 0,
    commonContentId: 0
  },
  contentList: [],
  editTickerForm: {
    mediaplanId: 0,
    tickerId: 0
  },
  tickerList: [],
  editBannerForm: {
    mediaplanId: 0,
    bannerId: 0,
    position: 0
  },
  bannerList: [],
  editAdsForm: {
    mediaplanId: 0,
    contentId: 0,
    position: 0
  },
  adsList: [],
  currentMediaplan: {
    id: 0,
    name: "",
    ads_start_delay: 0,
    banners_start_delay: 0,
    banners_repeat: false,
    banners_animation_duration_msec: 0,
    userId: 1,
    commonContentId: 0,
    tickerId: 0,
    common_content: 0,
    MediaplanBanner: [],
    ticker: {},
    MediaplanContent: []
  },
  contentTimelineList: [],
  bannerTimelineList: []
}

function mediaplanReducer (state = initialState, action) {
  switch(action.type){
    case MEDIAPLAN_SET_SUCCEED:
      return { ...state, isSucceed: action.data }
    case MEDIAPLAN_SET_MEDIAPLANS:
      return { ...state, mediaplans: action.data }
    case MEDIAPLAN_SET_PRELOADER:
      return { ...state, preloader: action.data}
    case MEDIAPLAN_SET_ADD_FORM: {
        let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
        return { ...state, addForm: newAddForm }
    }
    case MEDIAPLAN_CLEAR_ADD_FORM:
      return { ...state, addForm: initialState.addForm }
    case MEDIAPLAN_SET_CURRENT:
      return { ...state, currentMediaplanId: action.data}
    case MEDIAPLAN_SET_MEDIAPLAN:
      return { ...state, currentMediaplan: action.data}


    case MEDIAPLAN_SET_EDIT_OPTIONS_FORM: {
      let newEditOptionsForm = {...state.editOptionsForm, [action.data.name]: action.data.value}
      return { ...state, editOptionsForm: newEditOptionsForm }
    }
    case MEDIAPLAN_CLEAR_EDIT_OPTIONS_FORM:
      return { ...state, editOptionsForm: initialState.editOptionsForm }


    case MEDIAPLAN_SET_EDIT_CONTENT_FORM: {
      let newEditContentForm = {...state.editContentForm, [action.data.name]: action.data.value}
      return { ...state, editContentForm: newEditContentForm }
    }
    case MEDIAPLAN_CLEAR_EDIT_CONTENT_FORM:
      return { ...state, editContentForm: initialState.editContentForm }
    case MEDIAPLAN_SET_CONTENT_LIST:
      return { ...state, contentList: action.data}
    case MEDIAPLAN_CLEAR_CONTENT_LIST:
      return { ...state, contentList: initialState.contentList}


    case MEDIAPLAN_SET_EDIT_TICKER_FORM: {
      let newEditTickerForm = {...state.editTickerForm, [action.data.name]: action.data.value}
      return { ...state, editTickerForm: newEditTickerForm }
    }
    case MEDIAPLAN_CLEAR_EDIT_TICKER_FORM:
      return { ...state, editTickerForm: initialState.editTickerForm }
    case MEDIAPLAN_SET_TICKER_LIST:
      return { ...state, tickerList: action.data}
    case MEDIAPLAN_CLEAR_TICKER_LIST:
      return { ...state, tickerList: initialState.tickerList}


    case MEDIAPLAN_SET_EDIT_BANNER_FORM: {
      let newEditBannerForm = {...state.editBannerForm, [action.data.name]: action.data.value}
      return { ...state, editBannerForm: newEditBannerForm }
    }
    case MEDIAPLAN_CLEAR_EDIT_BANNER_FORM:
      return { ...state, editBannerForm: initialState.editBannerForm }
    case MEDIAPLAN_SET_BANNER_LIST:
      return { ...state, bannerList: action.data}
    case MEDIAPLAN_CLEAR_BANNER_LIST:
      return { ...state, bannerList: initialState.bannerList}


    case MEDIAPLAN_SET_EDIT_ADS_FORM: {
      let newEditAdsForm = {...state.editAdsForm, [action.data.name]: action.data.value}
      return { ...state, editAdsForm: newEditAdsForm }
    }
    case MEDIAPLAN_CLEAR_EDIT_ADS_FORM:
      return { ...state, editAdsForm: initialState.editAdsForm }
    case MEDIAPLAN_SET_ADS_LIST:
      return { ...state, adsList: action.data}
    case MEDIAPLAN_CLEAR_ADS_LIST:
      return { ...state, adsList: initialState.adsList}


    case MEDIAPLAN_PUT_TIMELINE_CONTENT: {
      const newContentTimelineList = state.contentTimelineList
      newContentTimelineList[action.data.position] = action.data.id
      return { ...state, contentTimelineList: newContentTimelineList}
    }
    case MEDIAPLAN_REMOVE_TIMELINE_CONTENT: {
      const newContentTimelineList = state.contentTimelineList
      newContentTimelineList.splice(action.data, 1)
      return { ...state, contentTimelineList: newContentTimelineList}
    }
    case MEDIAPLAN_RESET_TIMELINE_CONTENT: {
      return { ...state, contentTimelineList: action.data}
    }

    case MEDIAPLAN_PUT_TIMELINE_BANNER: {
      const newBannerTimelineList = state.bannerTimelineList
      newBannerTimelineList[action.data.position] = action.data.id
      return { ...state, bannerTimelineList: newBannerTimelineList}
    }
    case MEDIAPLAN_REMOVE_TIMELINE_BANNER: {
      const newBannerTimelineList = state.bannerTimelineList
      newBannerTimelineList.splice(action.data, 1)
      return { ...state, bannerTimelineList: newBannerTimelineList}
    }
    case MEDIAPLAN_RESET_TIMELINE_BANNER: {
      return { ...state, bannerTimelineList: action.data}
    }

    default: 
      return state
  }
}

export default mediaplanReducer