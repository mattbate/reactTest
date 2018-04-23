import {
    REQUEST_ORDERS,
    RECEIVE_ORDERS,
    RECEIVE_UPDATE_ORDER,
    REQUEST_UPDATE_ORDER,
    FAILED_UPDATE_ORDER, CLEAR_UPDATE_ORDER
} from './ordersv2Actions'



function orders(
    state = {
        isFetching: false,
        didInvalidate: false,
        orders: {}
    },
    action
) {
    switch (action.type) {
        case REQUEST_ORDERS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_ORDERS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                orders: action.json,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

export const ordersByFilter = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ORDERS:
        case REQUEST_ORDERS:
            return Object.assign({}, state,
                orders(state[action.filter], action)
            );
        default:
            return state;
    }
};

export const updateOrder = (state = {}, action) => {
    switch (action.type){
        case REQUEST_UPDATE_ORDER:
        case RECEIVE_UPDATE_ORDER:
            return {...state, ...action.orderUpdate, ...action};
        case FAILED_UPDATE_ORDER:
            return {...state, ...action.orderUpdate, ...action};
        case CLEAR_UPDATE_ORDER:
            return {...state, ...action.orderUpdate, ...action}
        default:
            return state;
    }
};
