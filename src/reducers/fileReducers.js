import { SAVE_FILE } from "../constants/fileConstants";

export const fileSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_FILE:
      return {
        ...state,

        file: action.payload,
      };
  }
  return state;
};
