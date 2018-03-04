// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryLine,
    VictoryZoomContainer
} from 'victory';
import { getWeatherNorms } from '../../redux';

type Props = {
    getWeatherNorms: string => void,
    plants: mixed,
    station: {
        daily: {
            minTemps: Array<number>,
            maxTemps: Array<number>
        }
    }
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
export class UserHome extends Component<Props, State> {
    state = {
        zip: '60007'
    };

    _handleClick = (evt: Event) => {
        evt.preventDefault();
        this.props.getWeatherNorms(this.state.zip);
    };

    _handleChange = (evt: Event) => this.setState({ zip: evt.target.value });

    render() {
        const { station } = this.props;
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
                {station.daily && (
                    <VictoryChart
                        width={700}
                        height={500}
                        animate
                        scale={{ x: 'time' }}
                        theme={VictoryTheme.material}
                    >
                        <VictoryArea
                            style={{ data: { fill: 'lightsalmon' } }}
                            x={'day'}
                            y={'temp'}
                            data={station.daily.maxTemps
                                .filter(temp => temp > 0)
                                .map((temp, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    temp: temp
                                }))}
                        />
                        <VictoryArea
                            style={{ data: { fill: 'lightblue' } }}
                            x={'day'}
                            y={'temp'}
                            data={station.daily.minTemps
                                .filter(temp => temp > 0)
                                .map((temp, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    temp: temp
                                }))}
                        />
                        <VictoryLine
                            x={'day'}
                            y={'temp'}
                            data={station.daily.minTemps
                                .filter(temp => temp > 0)
                                .map((temp, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    temp: 32
                                }))}
                        />
                    </VictoryChart>
                )}
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
