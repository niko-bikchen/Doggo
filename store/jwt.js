import { createStore } from "redux";
import { createReducer } from "../lib/redux";

export const initialState = {
  jwt: "",
};
export const ACTION_TYPES = {
  TEST: "TEST",
  DEFAULT: "DEFAULT",
  SET_JWT: "SET_JWT",
};
export const ACTIONS = {
  [ACTION_TYPES.TEST]: () => ({ type: ACTION_TYPES.TEST }),
  [ACTION_TYPES.SET_JWT]: ({ jwt }) => ({ type: ACTION_TYPES.SET_JWT, jwt }),
  [ACTION_TYPES.DEFAULT]: () => ({ type: ACTION_TYPES.DEFAULT }),
};
class Reducers {
  [ACTION_TYPES.TEST]({ state }) {
    return { ...state };
  }
  [ACTION_TYPES.SET_JWT]({ state, jwt }) {
    return { ...state, jwt };
  }
  [ACTION_TYPES.DEFAULT]({ state }) {
    return { ...state };
  }
}
const reducers = new Reducers();
export const jwtReducer = createReducer({
  reducers,
  initialState,
  ACTION_TYPES,
});
