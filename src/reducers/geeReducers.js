import {
  CREATE_L8_NDVI_FAIL,
  CREATE_L8_NDVI_REQUEST,
  CREATE_L8_NDVI_RESET,
  CREATE_L8_NDVI_SUCCESS,
  CREATE_S2_NDVI_FAIL,
  CREATE_S2_NDVI_REQUEST,
  CREATE_S2_NDVI_RESET,
  CREATE_S2_NDVI_SUCCESS,
} from "../constants/geeConstants";

export const ndvis2CreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_S2_NDVI_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_S2_NDVI_SUCCESS:
      return {
        loading: false,
        ndvi: action.payload,
        success: true,
      };
    case CREATE_S2_NDVI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_S2_NDVI_RESET:
      return {};
    default:
      return state;
  }
};

export const ndvil8CreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_L8_NDVI_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_L8_NDVI_SUCCESS:
      return {
        loading: false,
        ndvi: action.payload,
        success: true,
      };
    case CREATE_L8_NDVI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_L8_NDVI_RESET:
      return {};
    default:
      return state;
  }
};
