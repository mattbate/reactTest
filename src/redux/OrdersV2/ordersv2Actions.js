import fetch from 'cross-fetch';

export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';


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

    let queryParams = {
        EntriesPerPage:10,
        PaidOnly: filter.paidFor,
        PageNumber:filter.pageNumber
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
            headers:{
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