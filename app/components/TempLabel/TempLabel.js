// @flow
import React, { Component } from 'react'
import { formatAxis } from '../../utils/'

type Props = {
    x: number,
    y: number,
    text: {x: number, y: number},
    minTemps: Array<{temp: number}>,
    maxTemps: Array<{temp: number}>,
    gdd40: Array<{gdd: number}>,
    gdd50: Array<{gdd: number}>,
}

export default class TempLabel extends Component<Props> {
    _calcHeight = (value: number) => {
        const height = 500;
        const heightLessMargin = height - 60
        const max = Math.max(...this.props.maxTemps.map(obj => obj.temp))
        const ratio = (heightLessMargin - max) / max
        return heightLessMargin - (value * ratio)

    }
    
    render() {
        const { x, y, minTemps, maxTemps, gdd40, gdd50, text } = this.props
        const date = formatAxis(text.x)
        const idx = Math.floor(text.x)
        
        // const svgHeight = document.querySelector('.annualTemps svg').clientHeight;
        

        
        // console.log(svgHeight - gdd50[idx].gdd)
        return (
            <g>
                <g>
                    <text x={x} y={40} style={{fontSize: 10}}>{date}</text>
                    <text x={x} y={this._calcHeight(gdd50[idx].gdd)} style={{fontSize: 10}}>{`${gdd50[idx].gdd}°F`}</text>
                    <text x={x} y={this._calcHeight(gdd40[idx].gdd)} style={{fontSize: 10}}>{`${gdd40[idx].gdd}°F`}</text>
                    <text x={x} y={this._calcHeight(minTemps[idx].temp)} style={{fontSize: 10}}>{`${minTemps[idx].temp}°F`}</text>
                    <text x={x} y={this._calcHeight(maxTemps[idx].temp)} style={{fontSize: 10}}>{`${maxTemps[idx].temp}°F`}</text>
                </g>
            </g>
        )
    }
}