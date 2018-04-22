import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
import OrderDetail from './OrderDetail';

const store = configureStore();

export default class RootOrderDetail extends Component {
    render() {
        return (
            <Provider store={store}>
                <OrderDetail orderId={this.props.match.params.id}/>
            </Provider>
        )
    }
}