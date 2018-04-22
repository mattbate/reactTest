import React from 'react';
import {changeFilter} from '../redux/OrdersFilter/ordersFilterActions';
import {connect} from "react-redux";
import {Button} from "reactstrap";

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    handleNextClick = (event) => {
        this.props.changeFilter({pageNumber: this.props.pageNumber + 1});
    };
    handlePrevClick = (event) => {
        this.props.changeFilter({pageNumber: this.props.pageNumber - 1});
    };


    render() {
        return (

            <div className="row">

                <div className="col-sm-4">
                    {this.props.pageNumber >1 && <Button onClick={this.handlePrevClick}>&lt; Previous page</Button>}
                </div>
                <div className="col-sm-4"> Current page: {this.props.pageNumber}</div>
                <div className="col-sm-4">
                    <Button onClick={this.handleNextClick}>next page &gt;</Button>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        pageNumber: state.ordersFilterReducer.pageNumber
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
export default connect(mapStateToProps, mapDispatchToProps)(Pager);