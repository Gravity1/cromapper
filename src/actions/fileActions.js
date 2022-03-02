import { SAVE_FILE } from "../constants/fileConstants";

export const fileSave = (file) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_FILE,
    payload: file,
  });
};
