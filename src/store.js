import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  fieldCreateReducer,
  fieldDeleteReducer,
  fieldsGetReducer,
  fieldUpdateReducer,
} from "./reducers/fieldReducers";
import { fileSaveReducer } from "./reducers/fileReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  fileSave: fileSaveReducer,
  fieldCreate: fieldCreateReducer,
  fieldsGet: fieldsGetReducer,
  fieldGet: fieldsGetReducer,
  fieldDelete: fieldDeleteReducer,
  fieldUpdate: fieldUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  // userDelete: userDeleteReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
