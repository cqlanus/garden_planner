// @flow
import React, { Component } from 'react'
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryLine,
    VictoryLegend,
    VictoryAxis,
    VictoryCursorContainer,
} from 'victory'
import type { StationType } from '../../types'
import { formatAxis } from '../../utils'
import { TempLabel } from '../'

type Props = {
    station: StationType,
}

/**
 * COMPONENT
 */
export default class AnnualTemps extends Component<Props> {
    render() {
        const { station } = this.props
        const maxTemps = station.daily.maxTemps
            .filter(temp => temp > 0)
            .map((temp, idx) => ({
                day: idx,
                temp: temp,
            }))

        const minTemps = station.daily.minTemps
            .filter(temp => temp > 0)
            .map((temp, idx) => ({
                day: idx,
                temp: temp,
            }))
        const gdd40 = station.daily.dailyGdd40
            .filter(gdd => gdd !== -888)
            .map((gdd, idx) => ({
                day: idx,
                gdd: gdd > 0 ? gdd : 0,
            }))
        const gdd50 = station.daily.dailyGdd50
            .filter(gdd => gdd !== -888)
            .map((gdd, idx) => ({
                day: idx,
                gdd: gdd > 0 ? gdd : 0,
            }))
        return (
            <div className={'annualTemps'}>
                <h3>Historical Temperature Norms</h3>
                {station.daily && (
                    <VictoryChart
                        // animate
                        width={700}
                        height={500}
                        domain={{ x: [0, 366] }}
                        theme={VictoryTheme.material}
                        containerComponent={
                            <VictoryCursorContainer
                                cursorDimension="x"
                                cursorLabelComponent={
                                    <TempLabel
                                        minTemps={minTemps}
                                        maxTemps={maxTemps}
                                        gdd40={gdd40}
                                        gdd50={gdd50}
                                    />
                                }
                                cursorLabel={d => ({ ...d })}
                            />
                        }>
                        <VictoryArea
                            style={{ data: { fill: '#FCBAB8' } }}
                            x={'day'}
                            y={'temp'}
                            data={maxTemps}
                        />
                        <VictoryArea
                            style={{ data: { fill: '#95D7D8' } }}
                            x={'day'}
                            y={'temp'}
                            data={minTemps}
                        />
                        <VictoryArea
                            style={{ data: { fill: '#F4F4A8' } }}
                            x={'day'}
                            y={'gdd'}
                            data={gdd40}
                        />
                        <VictoryArea
                            style={{ data: { fill: '#C0E2C0' } }}
                            x={'day'}
                            y={'gdd'}
                            data={gdd50}
                        />

                        <VictoryLine
                            style={{
                                data: {
                                    stroke: '#6B5E62',
                                    strokeDasharray: [2, 10],
                                    strokeWidth: 3,
                                },
                            }}
                            x={'day'}
                            y={'temp'}
                            data={station.daily.minTemps
                                .filter(temp => temp > 0)
                                .map((temp, idx) => ({
                                    day: idx,
                                    temp: 32,
                                }))}
                        />

                        <VictoryLegend
                            x={50}
                            width={800}
                            orientation="horizontal"
                            gutter={20}
                            data={[
                                {
                                    name: 'Daily Max Temps',
                                    symbol: { fill: '#FCBAB8' },
                                },
                                {
                                    name: 'Daily Min Temps',
                                    symbol: { fill: '#95D7D8' },
                                },
                                {
                                    name: 'Daily GDD (40°F)',
                                    symbol: { fill: '#F4F4A8' },
                                },
                                {
                                    name: 'Daily GDD (50°F)',
                                    symbol: { fill: '#C0E2C0' },
                                },
                            ]}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{
                                axisLabel: { padding: 40 },
                                tickLabels: { fontSize: 10 },
                            }}
                            label="Temperature (°F)"
                            tickCount={10}
                        />
                        <VictoryAxis
                            style={{
                                axisLabel: { padding: 35 },
                                tickLabels: { fontSize: 8 },
                            }}
                            label="Months"
                            tickCount={10}
                            tickFormat={d => formatAxis(d)}
                        />
                    </VictoryChart>
                )}
            </div>
        )
    }
}
