// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AnnualTemps, CropBars, Card } from '../'
import type { StationType, Plant } from '../../types'
import { getWeatherNorms } from '../../redux'

type Props = {
    getWeatherNorms: string => void,
    plants: Array<Plant>,
    station: StationType,
}

type State = {
    zip: string,
}

type Event = {
    preventDefault: () => void,
    target: { value: string },
}

/**
 * COMPONENT
 */
class UserHome extends Component<Props, State> {
    state = {
        zip: '60007',
    }

    _handleClick = (evt: Event) => {
        evt.preventDefault()
        this.props.getWeatherNorms(this.state.zip)
    }

    _handleChange = (evt: Event) => this.setState({ zip: evt.target.value })

    render() {
        const { station, plants } = this.props
        const hasAllData = !!plants.length && station.daily
        return (
            <div className="userHome">
                <form onSubmit={this._handleClick}>
                    <input
                        onChange={this._handleChange}
                        value={this.state.zip}
                        type="text"
                    />
                    <button type="submit">Search</button>
                </form>
                {hasAllData && (
                    // <div className="chartContainer">
                    //     <CropBars plants={plants} station={station} />
                    //     <AnnualTemps station={station} />
                    // </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}>
                        <Card
                            style={{
                                flex: 2,
                                margin: '12px',
                            }}>
                            <CropBars plants={plants} station={station} />
                        </Card>
                        <Card
                            style={{ flex: 2, margin: '12px', marginLeft: 0 }}>
                            <AnnualTemps station={station} />
                        </Card>
                    </div>
                )}
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        plants: state.plants.plants,
        station: state.weather.station,
    }
}

const mapDispatch = dispatch => {
    return {
        getWeatherNorms: zip => dispatch(getWeatherNorms(zip)),
    }
}

export default connect(mapState, mapDispatch)(UserHome)
