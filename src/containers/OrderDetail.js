import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    fetchOrderDetails, fetchOrdersIfNeeded
} from '../redux/OrdersV2/ordersv2Actions'


class OrderDetail extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchOrderDetails(this.props.orderId));
    }

    componentDidUpdate(prevProps) {
        if (this.props.ordersFilter !== prevProps.ordersFilter) {
            const {dispatch} = this.props;
            dispatch(fetchOrdersIfNeeded(this.props.ordersFilter));
        }
    }

    render() {
        const {orders, isFetching, lastUpdated} = this.props;
        let orderDetail;
        if (orders && orders.OutgoingOrders && orders.OutgoingOrders.Order.length > 0) {
            orderDetail = orders.OutgoingOrders.Order[0];
        }

        return (
            <div>
                {isFetching && !orderDetail && <p>Loading...</p>}
                {/*{!isFetching && orderDetail && orderList.length === 0 && <p>Empty.</p>}*/}
                {orderDetail &&
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <ul>
                        <li>{orderDetail.Date}</li>
                    </ul>
                </div>}
            </div>
        );
    };
}

OrderDetail.propTypes = {
    order: PropTypes.any,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.any,
    dispatch: PropTypes.func.isRequired,

    orderId: PropTypes.any.isRequired
};

function mapStateToProps(state) {
    const {ordersByFilter, ordersFilterReducer} = state;
    let isFetching,
        lastUpdated,
        orders,


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

export default connect(mapStateToProps)(OrderDetail)