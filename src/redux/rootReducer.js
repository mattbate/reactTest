import { combineReducers } from 'redux';
import {ordersByFilter} from './OrdersV2/ordersv2Reducers';
import ordersFilterReducer from './OrdersFilter/ordersFilterReducers';

export const rootReducer = combineReducers({
    ordersByFilter,
    ordersFilterReducer
});

