// @flow
import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryLine,
    VictoryLegend,
    VictoryAxis
} from 'victory';
import type {StationType} from '../../types';

type Props = {
    station: StationType,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * COMPONENT
 */
export default class AnnualTemps extends Component<Props> {

    render() {
        const { station } = this.props;
        return (
            <div>
                {station.daily && (
                    <VictoryChart
                        width={700}
                        height={500}
                        scale={{ x: 'time' }}
                        // animate
                        theme={VictoryTheme.material}
                    >
                        <VictoryArea
                            style={{ data: { fill: '#FCBAB8' } }}
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
                            style={{ data: { fill: '#95D7D8' } }}
                            x={'day'}
                            y={'temp'}
                            data={station.daily.minTemps
                                .filter(temp => temp > 0)
                                .map((temp, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    temp: temp
                                }))}
                        />
                        <VictoryArea
                            style={{ data: { fill: '#F4F4A8' } }}
                            x={'day'}
                            y={'gdd'}
                            data={station.daily.dailyGdd40
                                .filter(gdd => gdd !== -888)
                                .map((gdd, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    gdd: gdd > 0 ? gdd : 0
                                }))}
                        />  
                        <VictoryArea
                            style={{ data: { fill: '#C0E2C0' } }}
                            x={'day'}
                            y={'gdd'}
                            data={station.daily.dailyGdd50
                                .filter(gdd => gdd !== -888)
                                .map((gdd, idx) => ({
                                    day: new Date(2018, 0, idx),
                                    gdd: gdd > 0 ? gdd : 0
                                }))}
                        />

                        <VictoryLine
                            style={{
                                data: {
                                    stroke: '#6B5E62',
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

                        <VictoryLegend x={50} width={800}
                            orientation="horizontal"
                            gutter={20}
                            data={[
                                {name: 'Daily Max Temps', symbol: {fill: '#FCBAB8'} },
                                {name: 'Daily Min Temps', symbol: {fill: '#95D7D8'}},
                                {name: 'Daily GDD (40℃)', symbol: {fill: '#F4F4A8'}},
                                {name: 'Daily GDD (50℃)', symbol: {fill: '#C0E2C0'}},
                            ]}
                        />
                        <VictoryAxis 
                            dependentAxis 
                            style={{axisLabel: {padding: 40}}}
                            label="Temperature"
                            tickCount={10}/>
                        <VictoryAxis 
                            style={{axisLabel: {padding: 35}}}
                            label="Months"
                            tickCount={8} 
                            tickFormat={d => months[d.getMonth()]}/>
                    </VictoryChart>
                )}
            </div>
        );
    }
}
