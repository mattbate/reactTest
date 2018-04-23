import { combineReducers } from 'redux';
import {ordersByFilter, updateOrder} from './OrdersV2/ordersv2Reducers';
import ordersFilterReducer from './OrdersFilter/ordersFilterReducers';

export const rootReducer = combineReducers({
    ordersByFilter,
    ordersFilterReducer,
    updateOrder
});

