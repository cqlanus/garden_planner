// @flow
import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryStack,
    VictoryBar,
    VictoryAxis
} from 'victory';
import { Crop } from '../../utils/'
import type { StationType, Plant } from '../../types';

type Props = {
    plants: Array<Plant>,
    station: StationType
};

export default class CropBars extends Component<Props> {

    _getSowIndoorCoords = (plant: Plant) => {
        const { station } = this.props
        const crop = new Crop(plant, station)
        return crop._getSowIndoorCoords()
    }

    _getSowOutdoorCoords = (plant: Plant) => {
        const { station } = this.props
        const crop = new Crop(plant, station)
        return crop._getSowOutdoorCoords()
    }
    
    render() {
        const { plants } = this.props;
        const sample = plants;

        return (
            <div>
                <VictoryChart
                    width={700}
                    height={500}
                    // scale={{ x: 'time' }}
                    // domain={{x: [new Date(2018, 0, 0), new Date(2018, 0, 365)]}}
                    domain={{ x: [0, 366] }}
                    domainPadding={10}
                    animate
                    theme={VictoryTheme.material}
                >
                    <VictoryStack horizontal colorScale={['steelblue', 'indianred']}>
                        <VictoryBar
                            data={sample.map(this._getSowIndoorCoords)}
                        />
                        <VictoryBar 
                            data={sample.map(this._getSowOutdoorCoords)}
                        />
                    </VictoryStack>
                    <VictoryAxis 
                        
                    />
                    <VictoryAxis
                        dependentAxis
                        invertAxis
                        style={{tickLabels: {fontSize: 8}}}
                        tickValues={sample.map(plant => plant.id)}
                        tickFormat={sample.map(plant => plant.commonName)}
                    />
                </VictoryChart>
            </div>
        );
    }
}
