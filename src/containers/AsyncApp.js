import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
        const { dispatch } = this.props;
        dispatch(fetchOrdersIfNeeded());
    }

    componentDidUpdate(prevProps) {
        // if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
            const { dispatch } = this.props;
            dispatch(fetchOrdersIfNeeded());
        // }
    }

    // handleChange(nextSubreddit) {
    //    // this.props.dispatch(selectSubreddit(nextSubreddit))
    //     this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
    // }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedSubreddit } = this.props;
        // dispatch(invalidateSubreddit(selectedSubreddit))
        dispatch(fetchOrdersIfNeeded(selectedSubreddit));
    }

    render() {
        const { posts, isFetching, lastUpdated } = this.props;
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
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && (posts === undefined || posts.length === 0) && <h2>Empty.</h2>}
                {posts && posts.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <ResultsTable />
                </div>}
            </div>
        );
    };
}

AsyncApp.propTypes = {
    // selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.any,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.any,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { ordersByFilter } = state;
    const {
        isFetching,
        lastUpdated,
        items: orders
    } = ordersByFilter || {
        isFetching: true,
        items: []
    };

    return {
        //selectedSubreddit,
        orders,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)