// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryLine,
    VictoryBar,
    VictoryTooltip
} from 'victory';
import { getWeatherNorms } from '../../redux';
import { getDayOfYear } from '../../utils/dates';

type Props = {
    getWeatherNorms: string => void,
    plants: mixed,
    station: Station
};

type Station = {
    daily: {
        minTemps: Array<number>,
        maxTemps: Array<number>
    },
    station: {
        last_frost_50: string,
        first_frost_50: string
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
class UserHome extends Component<Props, State> {
    state = {
        zip: '60007'
    };

    _handleClick = (evt: Event) => {
        evt.preventDefault();
        this.props.getWeatherNorms(this.state.zip);
    };

    _createBarData = (frostDay: string, station: Station) => ({
        x: new Date(2018, 0, getDayOfYear(frostDay)),
        y: station.daily.maxTemps.filter(temp => temp > 0)[getDayOfYear(frostDay)],
        label: frostDay
    });

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
                        scale={{ x: 'time' }}
                        theme={VictoryTheme.material}
                    >
                        <VictoryArea
                            style={{ data: { fill: 'mistyrose' } }}
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
                            style={{ data: { fill: 'lightcyan' } }}
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
                            style={{
                                data: {
                                    stroke: 'steelblue',
                                    strokeDasharray: [2, 10],
                                    strokeWidth: 3
                                }
                            }}
                            x={'day'}
                            y={'temp'}
                            data={station.daily.minTemps
                                .filter(temp => temp > 0)
                                .map((temp, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    temp: 32
                                }))}
                        />

                        {station.station.last_frost_50 !== '-666' &&
                            station.station.first_frost_50 !== '-666' && (
                                <VictoryBar
                                    data={[
                                        this._createBarData(station.station.last_frost_50, station),
                                        this._createBarData(station.station.first_frost_50, station),
                                    ]}
                                    style={{data: { width: 3, fill: 'steelblue' }}}
                                    labelComponent={<VictoryTooltip />}
                                />
                            )}
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
