// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnnualTemps, CropBars } from '../'
import type { Station, Plant } from '../../types';
import { getWeatherNorms } from '../../redux';

type Props = {
    getWeatherNorms: string => void,
    plants: Array<Plant>,
    station: Station
};

type State = {
    zip: string
};

type Event = {
    preventDefault: () => void,
    target: { value: string }
};

/**
 * COMPONENT
 */
class UserHome extends Component<Props, State> {
    state = {
        zip: '60007'
    };

    _handleClick = (evt: Event) => {
        evt.preventDefault();
        this.props.getWeatherNorms(this.state.zip);
    };

    _handleChange = (evt: Event) => this.setState({ zip: evt.target.value });

    render() {
        const { station, plants } = this.props;
        return (
            <div>
                <form onSubmit={this._handleClick}>
                    <input
                        onChange={this._handleChange}
                        value={this.state.zip}
                        type="text"
                    />
                    <button type="submit">Search</button>
                </form>
                {!!plants.length && <CropBars plants={plants} />}
                {station.daily && <AnnualTemps station={station} />}
            </div>
        );
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        plants: state.plants.plants,
        station: state.weather.station
    };
};

const mapDispatch = dispatch => {
    return {
        getWeatherNorms: zip => dispatch(getWeatherNorms(zip))
    };
};

export default connect(mapState, mapDispatch)(UserHome);
