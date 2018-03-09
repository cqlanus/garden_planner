// @flow
import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryArea,
    VictoryLine,
    VictoryBar,
    VictoryTooltip,
    VictoryLegend,
    VictoryAxis
} from 'victory';
import { getDayOfYear } from '../../utils/dates';
import type { Station, Plant } from '../../types';

type Props = {
    plants: Array<Plant>,
    station: Station
};

export default class CropBars extends Component<Props> {
    _createBarData = (frostDay: string, station: Station) => ({
        x: new Date(2018, 0, getDayOfYear(frostDay)),
        y: station.daily.maxTemps.filter(temp => temp > 0)[
            getDayOfYear(frostDay)
        ],
        label: frostDay
    });

    _getIndoorSowDay = (plant: Plant, station: Station) => {
        const sowIndoors = plant.sowIndoorsBeforeLastFrost * 7;
        const lastFrost = getDayOfYear(station.station.last_frost_50);
        return lastFrost - sowIndoors;
    };

    render() {
        const { plants } = this.props;
        const sample = plants.slice(5, 15);
        return (
            <div>
                <VictoryChart
                    width={700}
                    height={500}
                    // scale={{ x: 'time' }}
                    // animate
                    theme={VictoryTheme.material}
                >
                    <VictoryBar
                        horizontal
                        data={sample.map(plant => ({
                            x: plant.id,
                            y: plant.minGrowTemp
                        }))}
                    />
                    <VictoryAxis />
                    <VictoryAxis
                        dependentAxis
                        invertAxis
                        tickValues={sample.map(plant => plant.id)}
                        tickFormat={sample.map(plant => plant.commonName)}
                    />
                    {
                        // station.station.last_frost_50 !== '-666' &&
                        // station.station.first_frost_50 !== '-666' && (
                        //     <VictoryBar
                        //         data={[
                        //             this._createBarData(
                        //                 station.station.last_frost_50,
                        //                 station
                        //             ),
                        //             this._createBarData(
                        //                 station.station.first_frost_50,
                        //                 station
                        //             )
                        //         ]}
                        //         style={{ data: { width: 3, fill: '#6B5E62' } }}
                        //         labelComponent={<VictoryTooltip />}
                        //     />
                        // )
                    }
                </VictoryChart>
            </div>
        );
    }
}
