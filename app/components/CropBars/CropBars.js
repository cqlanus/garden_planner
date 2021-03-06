// @flow
import React, { Component } from 'react'
import {
    VictoryChart,
    VictoryTheme,
    VictoryStack,
    VictoryTooltip,
    VictoryCursorContainer,
    VictoryBar,
    VictoryLegend,
    VictoryAxis,
    createContainer,
} from 'victory'
import { Crop, formatAxis } from '../../utils/'
import { CropLabel } from '../'
import type { StationType, Plant } from '../../types'

type Props = {
    plants: Array<Plant>,
    station: StationType,
}

const ZoomCursorContainer = createContainer('zoom', 'cursor')

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
        const { plants } = this.props
        const sample = plants

        return (
            <div className="cropBars">
                <h3>Garden Planting Calendar</h3>
                <VictoryChart
                    // animate
                    width={400}
                    height={300}
                    containerComponent={
                        <ZoomCursorContainer
                            zoomDomain={{ y: [0, 15] }}
                            cursorDimension="x"
                            style={{ height: '400px', width: '100%' }}
                            cursorLabelComponent={<CropLabel plants={sample} />}
                            cursorLabel={d => ({ ...d })}
                        />
                    }
                    theme={VictoryTheme.material}
                    domain={{ x: [0, 366] }}
                    domainPadding={10}>
                    <VictoryStack
                        horizontal
                        colorScale={['steelblue', 'darkseagreen', 'indianred']}>
                        <VictoryBar
                            data={sample.map(this._getSowIndoorCoords)}
                        />
                        <VictoryBar
                            style={{ data: { strokeWidth: 3 } }}
                            data={sample.map(this._getHarvestCoords)}
                        />

                        <VictoryBar
                            data={sample.map(this._getSowOutdoorCoords)}
                        />
                    </VictoryStack>
                    <VictoryAxis
                        tickCount={10}
                        style={{ tickLabels: { fontSize: 8 } }}
                        tickFormat={formatAxis}
                        axisLabelComponent={<VictoryTooltip />}
                    />
                    <VictoryAxis
                        dependentAxis
                        invertAxis
                        style={{ tickLabels: { fontSize: 8 } }}
                        tickValues={sample.map(plant => plant.id)}
                        tickFormat={d => {
                            const plant = sample[d - 1]
                            return plant ? plant.commonName : 'hello'
                        }}
                    />
                    <VictoryLegend
                        // x={50}
                        width={400}
                        orientation="horizontal"
                        gutter={20}
                        data={[
                            {
                                name: 'Sow Indoors',
                                symbol: { fill: 'steelblue' },
                            },
                            {
                                name: 'Harvest',
                                symbol: { fill: 'darkseagreen' },
                            },
                            {
                                name: 'Sow/Transplant Outdoors',
                                symbol: { fill: 'indianred' },
                            },
                        ]}
                    />
                </VictoryChart>
            </div>
        )
    }
}
