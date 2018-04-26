import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    fetchOrderDetails, fetchOrdersIfNeeded
} from '../redux/OrdersV2/ordersv2Actions'
import UpdateOrder from "./UpdateOrder";


class OrderDetail extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchOrderDetails(this.props.orderId));
    }

    componentDidUpdate(prevProps) {

        if (this.props.orderId !== prevProps.orderId) {
            const {dispatch} = this.props;
            dispatch(fetchOrdersIfNeeded(this.props.ordersFilter));
        }

    }

    render() {
        const {orders, isFetching, lastUpdated} = this.props;
        let orderDetail, itemList;
        if (orders && orders.OutgoingOrders && orders.OutgoingOrders.Order.length > 0) {
            orderDetail = orders.OutgoingOrders.Order[0];
            itemList = orderDetail.OrderItems.Item.map((item, idx)=>{
                return (
                    <li className="list-group-item" key={idx}><strong>{item.ProductTitle}</strong> {item.Quantity} @ {orderDetail.CurrencyCode+item.UnitCost}</li>
                )
            })
        }

        return (
            <div>
                {isFetching && !orderDetail && <p>Loading...</p>}
                {/*{!isFetching && orderDetail && orderList.length === 0 && <p>Empty.</p>}*/}
                {orderDetail &&
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <h1>Order details</h1>
                    <div className="row">
                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item">Order date: {new Date(orderDetail.Date).toLocaleDateString('en-GB',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</li>
                                <li className="list-group-item">Status: {orderDetail.OrderStatus}</li>
                                <li className="list-group-item">Value: {orderDetail.CurrencyCode + orderDetail.OrderTotal}</li>
                                <li className="list-group-item"><ul>
                                    <li>{orderDetail.CustomerName}</li>
                                    <li>{orderDetail.CustomerAddress1}</li>
                                    <li>{orderDetail.CustomerCity}</li>
                                </ul></li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="list-group list-group-flush">
                                {itemList}
                            </ul>
                            <UpdateOrder orderId={this.props.orderId} />
                        </div>
                    </div>
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