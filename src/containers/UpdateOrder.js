import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    updateOrder,
    clearUpdateOrder
} from '../redux/OrdersV2/ordersv2Actions'
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";


class UpdateOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNote: '',
            badOrderId: 2147483647325,
            useBadNumber: false
        };
        this.handleUpdateOrder = this.handleUpdateOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    // componentDidMount() {
    //     const {dispatch} = this.props;
    //     dispatch(fetchOrderDetails(this.props.orderId));
    // }
    //
    // componentDidUpdate(prevProps) {
    //     if (this.props.ordersFilter !== prevProps.ordersFilter) {
    //         const {dispatch} = this.props;
    //         dispatch(fetchOrdersIfNeeded(this.props.ordersFilter));
    //     }
    // }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(clearUpdateOrder());
    }


    handleUpdateOrder(e){
        e.preventDefault();
        const {dispatch} = this.props;

        let ESPOrderNo = this.state.useBadNumber? this.state.badOrderId : this.props.orderId;

        let orderUpdate = {
            "OrderUpdate": [
                {
                    "ESPOrderNo": ESPOrderNo,
                    "OrderStatus": "WAITING_FOR_DELIVERY",
                    "OnHoldNotes": "updated by app",
                    "Notes": this.state.orderNote,
                }
            ]
        }

        dispatch(updateOrder(orderUpdate));
    }

    handleChange(event) {
        this.setState({orderNote: event.target.value});
    }
    handleCheckBox(event) {
        this.setState({useBadNumber: !this.state.useBadNumber})
    }
    render() {

        return (
            <div>
                <h2>Add note</h2>
                {this.props.updateOrder &&
                    this.props.updateOrder.type === "FAILED_UPDATE_ORDER" &&
                 <Alert color="danger">Unfortunatly there was an error</Alert>}

                {this.props.updateOrder &&
                this.props.updateOrder.type === "RECEIVE_UPDATE_ORDER" &&
                this.props.updateOrder.response.responseStatus === "OK" &&
                <Alert color="success">Successfully update</Alert>}

                <Form onSubmit={this.handleUpdateOrder}>

                    <FormGroup>
                        <Label>
                            Note for order
                            <Input type="text" name='orderNote' value={this.state.orderNote} onChange={this.handleChange} />

                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <Input type="checkbox" name='useBadNumber' onClick={this.handleCheckBox} value={this.state.useBadNumber}/>
                            Use bad ESPOrderNo
                        </Label>
                    </FormGroup>

                    <Button>Submit</Button>

                </Form>

            </div>
        );
    };
}

UpdateOrder.propTypes = {
    updateOrder: PropTypes.any,
    dispatch: PropTypes.func.isRequired,
    orderId: PropTypes.any.isRequired
};

function mapStateToProps(state) {
    const {updateOrder} = state;

    return {
        updateOrder,
    }
}

export default connect(mapStateToProps)(UpdateOrder)