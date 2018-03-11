// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Main, UserHome } from './components';
import { me, getWeatherNorms, getPlants } from './redux';

type Props = {
    getPlants: () => void,
    getWeatherNorms: string => void,
    isLoggedIn: boolean
}

/**
 * COMPONENT
 */
class App extends Component<Props> {
    componentDidMount() {
        const { getWeatherNorms, getPlants } = this.props;
        getWeatherNorms('60007');
        getPlants();
    }

    render() {
        return (
            <UserHome />
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