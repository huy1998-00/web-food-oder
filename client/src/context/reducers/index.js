import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";

/// manage reducers
const myReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
});

export default myReducer;
