import {CHANGE_FILTERS} from "./ordersFilterActions";

const initialState = {};

const ordersFilterReducer = (state = initialState, action) => {
  switch (action.type){
      case CHANGE_FILTERS:
          return {...state, ...action.payload};
      default:
          return state;
  }
};

export default ordersFilterReducer;