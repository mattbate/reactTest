import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from '../redux/configureStore';
import AsynchApp from './AsyncApp';

const store = configureStore();

export default class RootApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsynchApp/>
            </Provider>
        )
    }
}