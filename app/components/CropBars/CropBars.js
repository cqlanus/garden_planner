// @flow
import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryStack,
    VictoryTooltip,
    VictoryCursorContainer,
    VictoryBar,
    VictoryAxis
} from 'victory';
import { Crop, formatAxis } from '../../utils/'
import { Label } from '../'
import type { StationType, Plant } from '../../types';

type Props = {
    plants: Array<Plant>,
    station: StationType
};

export default class CropBars extends Component<Props> {

    _getSowIndoorCoords = (plant: Plant) => {
        const { station } = this.props
        const crop = new Crop(plant, station)
        return crop.getSowIndoorCoords()
    }

    _getSowOutdoorCoords = (plant: Plant) => {
        const { station } = this.props
        const crop = new Crop(plant, station)
        return crop.getSowOutdoorCoords()
    }

    _getHarvestCoords = (plant: Plant) => {
        const { station } = this.props
        const crop = new Crop(plant, station)
        return crop.getHarvestCoords()
    }
    
    render() {
        const { plants } = this.props;
        const sample = plants;

        return (
            <div>
                <VictoryChart
                    width={700}
                    height={500}
                    // containerComponent={<VictoryZoomContainer/>}
                    containerComponent={
                        <VictoryCursorContainer
                            cursorDimension="x"
                            cursorLabelComponent={
                                <Label 
                                    plants={sample}
                                />
                            }
                            cursorLabel={d => ({...d})}
                        />
                    }
                    domain={{x: [0, 366]}}
                    domainPadding={10}
                    theme={VictoryTheme.material}
                >
                    <VictoryStack 
                        horizontal 
                        colorScale={['steelblue', 'darkseagreen', 'indianred']}>
                        <VictoryBar 
                            data ={sample.map(this._getSowIndoorCoords)}
                        />
                        <VictoryBar 
                            style={{data: {strokeWidth: 3}}}
                            data ={sample.map(this._getHarvestCoords)}
                        />
                        
                        <VictoryBar 
                            data ={sample.map(this._getSowOutdoorCoords)}
                        />
                        
                    </VictoryStack>
                    <VictoryAxis 
                        tickCount={10}
                        style={{tickLabels: {fontSize: 8}}}
                        tickFormat={formatAxis}
                        axisLabelComponent={<VictoryTooltip />}
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
