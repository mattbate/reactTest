import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
import OrderList from './OrderList';

const store = configureStore();

export default class RootOrderListApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <OrderList/>
            </Provider>
        )
    }
}