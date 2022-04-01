import { url } from "../config/url";
import {
  CREATE_L8_NDVI_FAIL,
  CREATE_L8_NDVI_REQUEST,
  CREATE_L8_NDVI_SUCCESS,
  CREATE_S2_NDVI_FAIL,
  CREATE_S2_NDVI_REQUEST,
  CREATE_S2_NDVI_SUCCESS,
} from "../constants/geeConstants";
import axios from "axios";

export const createndviS2 = (polygon) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_S2_NDVI_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/gee/s2ndvi`, { polygon }, config);
    dispatch({
      type: CREATE_S2_NDVI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_S2_NDVI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNdviL8 = (polygon) => async (dipatch, getState) => {
  try {
    dipatch({ type: CREATE_L8_NDVI_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`${url}/gee/l8ndvi`, { polygon }, config);
    dipatch({
      type: CREATE_L8_NDVI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dipatch({
      type: CREATE_L8_NDVI_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
