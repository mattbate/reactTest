import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    //selectSubreddit,
    fetchOrdersIfNeeded,
    //invalidateSubreddit
} from '../redux/OrdersV2/ordersv2Actions'

import ResultsTable from '../components/resultsTable';
import FilterWrapper from '../components/orderFilter';
import Pager from '../components/pager';


class OrderList extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchOrdersIfNeeded(this.props.ordersFilter));
    }

    componentDidUpdate(prevProps) {
        if (this.props.ordersFilter !== prevProps.ordersFilter) {
            const {dispatch} = this.props;
            dispatch(fetchOrdersIfNeeded(this.props.ordersFilter));
        }
    }

    // handleChange(nextSubreddit) {
    //    // this.props.dispatch(selectSubreddit(nextSubreddit))
    //     this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
    // }

    handleRefreshClick(e) {
        e.preventDefault();

        const {dispatch, selectedSubreddit} = this.props;
        // dispatch(invalidateSubreddit(selectedSubreddit))
        dispatch(fetchOrdersIfNeeded(selectedSubreddit));
    }

    render() {
        const {orders, isFetching, lastUpdated} = this.props;
        let orderList;
        if (orders && orders.OutgoingOrders && orders.OutgoingOrders.Order.length > 0) {
            orderList = orders.OutgoingOrders.Order;
        }
        let columns = [{
            text: "Date",
            key: 'Date'
        },{
            text: "ESP Order No",
            key: 'ESPOrderNo'
        },{
            text: "Amount",
            key: 'OrderTotal'
        },{
            text: "Status",
            key: 'OrderStatus'
        }];
        return (
            <div>
                <div>
                    <FilterWrapper />
                </div>
                {isFetching && !orderList && <p>Loading...</p>}
                {!isFetching && orderList && orderList.length === 0 && <p>Empty.</p>}
                {orderList && orderList.length > 0 &&
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <ResultsTable orders={orderList} columns={columns}/>
                    <Pager />
                </div>}
            </div>
        );
    };
}

OrderList.propTypes = {
    // selectedSubreddit: PropTypes.string.isRequired,
    orders: PropTypes.any,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.any,
    dispatch: PropTypes.func.isRequired,

    ordersFilter: PropTypes.object
};

function mapStateToProps(state) {
    const {ordersByFilter, ordersFilterReducer} = state;
    let isFetching,
        lastUpdated,
        orders,
        ordersFilter;

    ordersFilter = ordersFilterReducer;
    if (Object.keys(ordersByFilter).length !== 0) {
        isFetching = ordersByFilter.isFetching;
        lastUpdated = ordersByFilter.lastUpdated;
        orders = ordersByFilter.orders;
    } else {
        isFetching = true;
        orders = {};

    }

    return {
        orders,
        isFetching,
        lastUpdated,
        ordersFilter
    }
}

export default connect(mapStateToProps)(OrderList)