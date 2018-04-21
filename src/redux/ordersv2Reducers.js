import {
    REQUEST_ORDERS,
    RECEIVE_ORDERS
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
                orders: action.orders,
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
            return Object.assign({}, state, {
                orders: orders(state[action.filter], action)
            });
        default:
            return state
    }
};

