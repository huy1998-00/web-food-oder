import { combineReducers } from "redux";
import userReducer from "./userReducer";

/// manage reducers
const myReducer = combineReducers({
  user: userReducer,
});

export default myReducer;
