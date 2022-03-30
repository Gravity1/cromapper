import {
  CREATE_FIELD_FAIL,
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_RESET,
  CREATE_FIELD_SUCCESS,
  DELETE_FIELD_FAIL,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_RESET,
  DELETE_FIELD_SUCCESS,
  GET_FIELDS_FAIL,
  GET_FIELDS_REQUEST,
  GET_FIELDS_RESET,
  GET_FIELDS_SUCCESS,
  GET_FIELD_FAIL,
  GET_FIELD_REQUEST,
  GET_FIELD_RESET,
  GET_FIELD_SUCCESS,
  UPDATE_FIELD_FAIL,
  UPDATE_FIELD_REQUEST,
  UPDATE_FIELD_RESET,
  UPDATE_FIELD_SUCCESS,
} from "../constants/fieldConstants";

// export const addFieldReducer = (state = { field: [] }, action) => {
//   switch (action.type) {
//     case SAVE_FIELD:
//       return { loading: false, field: action.payload };

//     default:
//       return state;
//   }
// };

export const fieldCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FIELD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FIELD_SUCCESS:
      return {
        loading: false,
        field: action.payload,
        success: true,
      };
    case CREATE_FIELD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_FIELD_RESET:
      return {};
    default:
      return state;
  }
};

export const fieldsGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FIELDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FIELDS_SUCCESS:
      return {
        loading: false,
        fields: action.payload,
      };
    case GET_FIELDS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_FIELDS_RESET:
      return {};
    default:
      return state;
  }
};

export const fieldDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FIELD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FIELD_SUCCESS:
      return {
        loading: false,
        field: action.payload,
        success: true,
      };
    case DELETE_FIELD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_FIELD_RESET:
      return {};
    default:
      return state;
  }
};

export const fieldUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FIELD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FIELD_SUCCESS:
      return {
        loading: false,
        field: action.payload,
        success: true,
      };
    case UPDATE_FIELD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_FIELD_RESET:
      return {};
    default:
      return state;
  }
};

export const fieldGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FIELD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FIELD_SUCCESS:
      return {
        loading: false,
        field: action.payload,
      };
    case GET_FIELD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_FIELD_RESET:
      return {};
    default:
      return state;
  }
};
