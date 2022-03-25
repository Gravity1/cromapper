import { SAVE_FILE } from "../constants/fileConstants";

export const saveFile = (file) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_FILE,
    payload: file,
  });
};
