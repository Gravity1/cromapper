import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  fieldCreateReducer,
  fieldDeleteReducer,
  fieldGetReducer,
  fieldsGetReducer,
  fieldUpdateReducer,
} from "./reducers/fieldReducers";
import { fileSaveReducer } from "./reducers/fileReducers";
import {
  ndvil8CreateReducer,
  ndvis2CreateReducer,
} from "./reducers/geeReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  fileSave: fileSaveReducer,
  fieldCreate: fieldCreateReducer,
  fieldsGet: fieldsGetReducer,
  fieldGet: fieldGetReducer,
  fieldDelete: fieldDeleteReducer,
  fieldUpdate: fieldUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  ndvil8Create: ndvil8CreateReducer,
  ndvis2Create: ndvis2CreateReducer,
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
