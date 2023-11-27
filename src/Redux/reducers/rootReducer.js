import { combineReducers } from "redux";

import AuthReducer from "../reducers/AuthReducer.js";
import CreateBlogReducer from "../reducers/CreateBlogReducer.js";

const rootReducer = combineReducers({
  AuthReducer,
  CreateBlogReducer,
});

export default rootReducer;
