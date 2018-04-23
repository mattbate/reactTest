import React from 'react';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {changeFilter} from '../redux/OrdersFilter/ordersFilterActions';
import {connect} from "react-redux";

class FilterWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate
        }
    }

    handleCheckBox = (event) => {
        this.props.changeFilter({paidFor: !this.props.paidFor, pageNumber: 1});
    };
    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
        this.props.changeFilter({startDate: event.target.value, pageNumber: 1})
    };
    handleEndDate = (event) => {
        this.setState({endDate: event.target.value});
        this.props.changeFilter({endDate: event.target.value, pageNumber: 1})
    };
    render() {
        return (
            <Form className="row">

                <FormGroup check className="col">
                    <Label check>
                        <Input type="checkbox" name='paidfor' onClick={this.handleCheckBox} value={this.props.paidFor}/>
                        Paid for only
                    </Label>
                </FormGroup>

                <FormGroup className="col">
                    <Label>
                        Start date
                        <Input type="date" name="startDate" onChange={this.handleStartDate} value={this.state.startDate}/>
                    </Label>
                </FormGroup>
                <FormGroup className="col">
                    <Label>
                        End date
                        <Input type="date" name="endDate" onChange={this.handleEndDate} value={this.state.endDate}/>
                    </Label>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        paidFor: state.ordersFilterReducer.paidFor,
        endDate: state.ordersFilterReducer.endDate,
        startDate: state.ordersFilterReducer.startDate
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeFilter: keyValuePairs => {
            dispatch(changeFilter(keyValuePairs));
        }
    }
}

//export default FilterWrapper;
export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);