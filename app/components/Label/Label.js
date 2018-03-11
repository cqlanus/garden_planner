// @flow
import React, { Component } from 'react'
import { formatAxis } from '../../utils/'

type Props = {
    x: number,
    y: number,
    plants: Array<mixed>,
    text: {x: number, y: number}
}

export default class Label extends Component<Props> {
    render() {
        const { x, y, plants, text } = this.props
        const plant = plants[Math.floor(text.y)]
        const date = formatAxis(text.y)
        return (
            <g>
                {!!plant && <g>
                    <text x={x} y={y}>{plant.commonName}</text>
                    <text x={x} y={y - 16}>{date}</text>
                </g>}
            </g>
        )
    }
}