import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    //selectSubreddit,
    fetchOrdersIfNeeded,
    //invalidateSubreddit
} from '../redux/ordersv2Actions'

import ResultsTable from '../components/resultsTable';

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchOrdersIfNeeded());
    }

    componentDidUpdate(prevProps) {
        // if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
        // const {dispatch} = this.props;
        // dispatch(fetchOrdersIfNeeded());
        // }
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
        if (orders.orders && orders.orders.OutgoingOrders && orders.orders.OutgoingOrders.Order.length > 0) {
            orderList = orders.orders.OutgoingOrders.Order.map(order =>{
                return (
                    <li>{order.ESPOrderNo}</li>
                )
            })
        }

        return (
            <div>
                <p>
                    {lastUpdated &&
                    <span>
              {/*Last updated at {new Date(lastUpdated).toLocaleTimeString()}.*/}
                        {' '}
            </span>}
                    {!isFetching &&
                    <button onClick={this.handleRefreshClick}>
                        Refresh
                    </button>}
                </p>
                {isFetching && !orderList && <h2>Loading...</h2>}
                {!isFetching &&orderList && orderList.length === 0 && <h2>Empty.</h2>}
                {orderList && orderList.length > 0 &&
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <ul>
                        {orderList}
                    </ul>
                </div>}
            </div>
        );
    };
}

AsyncApp.propTypes = {
    // selectedSubreddit: PropTypes.string.isRequired,
    orders: PropTypes.any,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.any,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {ordersByFilter} = state;
    let isFetching,
        lastUpdated,
        orders;

    if (Object.keys(ordersByFilter).length !== 0) {
        isFetching = ordersByFilter.isFetching;
        lastUpdated = ordersByFilter.lastUpdated;
        orders = ordersByFilter.orders;
    } else {
        isFetching = true;
        orders = {};
    }

    return {
        //selectedSubreddit,
        orders,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)