import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Main, UserHome } from './components';
import { me, getWeatherNorms, getPlants } from './redux';

/**
 * COMPONENT
 */
class App extends Component {
    componentDidMount() {
        const { getWeatherNorms, getPlants } = this.props;
        getWeatherNorms(60007);
        getPlants();
        // this.props.loadInitialData();
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <Main>
                <UserHome />
            </Main>
        );
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!state.user.id
    };
};

const mapDispatch = dispatch => {
    return {
        loadInitialData: () => dispatch(me()),
        getWeatherNorms: zip => dispatch(getWeatherNorms(zip)),
        getPlants: () => dispatch(getPlants())
    };
};

export default connect(mapState, mapDispatch)(App);

/**
 * PROP TYPES
 */
App.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};
