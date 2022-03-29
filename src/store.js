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

const reducer = combineReducers({
  fileSave: fileSaveReducer,
  fieldCreate: fieldCreateReducer,
  fieldsGet: fieldsGetReducer,
  fieldGet: fieldsGetReducer,
  fieldDelete: fieldDeleteReducer,
  fieldUpdate: fieldUpdateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
