import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";

/// manage reducers
const myReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
});

export default myReducer;
