import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {changeFilter} from '../redux/OrdersFilter/ordersFilterActions';
import {connect} from "react-redux";

class FilterWrapper extends React.Component {
    constructor (props){
        super(props);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    handleCheckBox = (event) => {
        this.props.changeFilter({paidFor: !this.props.paidFor, pageNumber:1});
    };

    render(){
        return (
            <Form>
                <FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name='paidfor' onClick={this.handleCheckBox} value={this.props.paidFor}/>
                            Paid for only
                        </Label>
                    </FormGroup>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        paidFor: state.ordersFilterReducer.paidFor
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        changeFilter: keyValuePairs => {
            dispatch(changeFilter(keyValuePairs));
        }
    }
}

//export default FilterWrapper;
export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);