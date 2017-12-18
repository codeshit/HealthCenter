import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export default function configureStore(initState = {}) {
  return createStoreWithMiddleware(rootReducer, initState);
}
