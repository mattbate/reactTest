import { combineReducers } from 'redux';
import {ordersByFilter} from './ordersv2Reducers';

export const rootReducer = combineReducers({
    ordersByFilter
});

