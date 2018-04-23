import React from 'react';
import {mount} from 'enzyme';
import Pager from './pager';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const middleWares = [];
const mockStore = configureStore(middleWares);
Enzyme.configure({ adapter: new Adapter() });
describe(
    'Pager tests:', () => {
        it('Renders a component with both buttons', () => {
            const initialState = {
                ordersFilterReducer: {
                    pageNumber: 5
                }
            };
            const store = mockStore(initialState);
            const wrapper = mount(
                <Provider store={store}>
                    <Pager/>
                </Provider>
            );
            expect(wrapper).toMatchSnapshot();
        });
        it('Renders a component with 1 button', () => {
            const initialState = {
                ordersFilterReducer: {
                    pageNumber: 1
                }
            };
            const store = mockStore(initialState);
            const wrapper = mount(
                <Provider store={store}>
                    <Pager/>
                </Provider>
            );
            expect(wrapper).toMatchSnapshot();
        });
    }
);