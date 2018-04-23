import fetch from 'cross-fetch';

export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';

export const REQUEST_UPDATE_ORDER = 'REQUEST_UPDATE_ORDER';
export const RECEIVE_UPDATE_ORDER = 'RECEIVE_UPDATE_ORDER';
export const FAILED_UPDATE_ORDER = 'FAILED_UPDATE_ORDER';
export const CLEAR_UPDATE_ORDER = 'CLEAR_UPDATE_ORDER';

function requestOrders(filter) {
    return {
        type: REQUEST_ORDERS,
        filter
    }
}

function receiveOrders(filter, json) {
    return {
        type: RECEIVE_ORDERS,
        filter,
        json,//.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchOrders(filter) {
    let queryParams = {};
    if (filter.id) {
        queryParams = {
            ESPOrderNo: filter.id
        };
    } else {
        queryParams = {
            EntriesPerPage: 10,
            PaidOnly: filter.paidFor,
            PageNumber: filter.pageNumber
        };
    }

    // iterate through key-value gracefully
    let queryString = '';
    for (const [key, value] of Object.entries(queryParams)) {
        queryString += `${key}=${value}&`
    }

    return dispatch => {
        dispatch(requestOrders(filter));
        let url = 'http://user-experience1.esellerpro.com/eSellerProAPI/services/api/rs/v2/orders?' + queryString;
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Basic aW50ZXJ2aWV3Lk1hdHRoZXdCOmludGVydmlldw==',
                Accept: 'application/json'
            }
        }).then(response => response.json())
            .then(json => dispatch(receiveOrders(filter, json)))
            .catch(rejection => console.log(rejection));
    }
}

function shouldFetchOrders(state, filter) {
    const orders = state.ordersByFilter[filter];
    if (!orders) {
        return true;
    } else if (orders.isFetching) {
        return false;
    } else {
        return orders.didInvalidate;
    }
}

export function fetchOrdersIfNeeded(filter) {
    return (dispatch, getState) => {
        if (shouldFetchOrders(getState(), filter)) {
            return dispatch(fetchOrders(filter))
        }
    };
}

export function fetchOrderDetails(id) {
    return (dispatch, getState) => {
        if (shouldFetchOrders(getState(), {id:id})) {
            return dispatch(fetchOrders({id:id}))
        }
    };
}

function requestUpdateOrder(orderUpdate) {
    return {
        type: REQUEST_UPDATE_ORDER,
        orderUpdate
    }
}

function receiveUpdateOrder(orderUpdate, response) {
    return {
        type: RECEIVE_UPDATE_ORDER,
        orderUpdate,
        response,
        receivedAt: Date.now()
    }
}

function failedUpdateOrder(orderUpdate, response) {
    return{
        type: FAILED_UPDATE_ORDER,
        orderUpdate,
        response,
        receivedAt: Date.now()
    }
}

export function clearUpdateOrder (){
    return {type: CLEAR_UPDATE_ORDER,
        orderUpdate:{},
        response:{},
        receivedAt: Date.now()
    }
}
function doUpdateOrder(orderUpdate) {



    return dispatch => {
        dispatch(requestUpdateOrder(orderUpdate));
        let url = 'http://user-experience1.esellerpro.com/eSellerProAPI/services/api/rs/orders';
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(orderUpdate),
            headers: {
                Authorization: 'Basic aW50ZXJ2aWV3Lk1hdHRoZXdCOmludGVydmlldw==',
                Accept: 'application/json',


                "Content-Type": "application/json"

            }
        }).then(response => response.json())
            .then(json => dispatch(receiveUpdateOrder(orderUpdate, json)))
            .catch(reason => dispatch(failedUpdateOrder(orderUpdate, reason)));
    }
}

export function updateOrder(orderUpdate) {
    return (dispatch, getState) => {
        return dispatch(doUpdateOrder(orderUpdate))
    }
}