// @flow
import React, { Component } from 'react'
import { formatAxis } from '../../utils/'
import { Plant } from '../../types'

type Props = {
    x: number,
    y: number,
    plants: Array<Plant>,
    text: { x: number, y: number },
}

export default class CropLabel extends Component<Props> {
    render() {
        const { x, y, plants, text } = this.props
        const plant = plants[Math.floor(text.y)]
        const date = formatAxis(text.x)
        return (
            <g>
                {!!plant && (
                    <g>
                        <text x={x} y={y} style={{ fontSize: 10 }}>
                            {plant.commonName}
                        </text>
                        <text x={x} y={40} style={{ fontSize: 10 }}>
                            {date}
                        </text>
                    </g>
                )}
            </g>
        )
    }
}
