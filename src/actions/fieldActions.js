import axios from "axios";
import { url } from "../config/url";
import {
  CREATE_FIELD_FAIL,
  CREATE_FIELD_REQUEST,
  CREATE_FIELD_SUCCESS,
  DELETE_FIELD_FAIL,
  DELETE_FIELD_REQUEST,
  DELETE_FIELD_SUCCESS,
  GET_FIELDS_FAIL,
  GET_FIELDS_REQUEST,
  GET_FIELDS_SUCCESS,
  SAVE_FIELD,
} from "../constants/fieldConstants";
import { logout } from "./userActions";

export const saveField = (data) => (dispatch) => {
  dispatch({
    type: SAVE_FIELD,
    payload: data,
  });
};

export const createField = (field) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_FIELD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/fields`, field, config);
    dispatch({
      type: CREATE_FIELD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FIELD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFields = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FIELDS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${url}/fields`, config);
    dispatch({
      type: GET_FIELDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({
      type: GET_FIELDS_FAIL,
      payload: message,
    });
  }
};

export const deleteField = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_FIELD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`${url}/fields/${id}`, config);
    dispatch({
      type: DELETE_FIELD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FIELD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
