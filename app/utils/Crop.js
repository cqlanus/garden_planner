import type { StationType, Plant } from '../types'
import { Station } from './'

export class Crop {
    constructor(plant: Plant, station: StationType) {
        this.plant = plant
        this.station = new Station(station)
    }

    _getIndoorSowMin = (): number => {
        const lastFrost = this.station._getLastFrost()
        if (this.plant.sowIndoorsBeforeLastFrost) {
            const sowIndoors = this.plant.sowIndoorsBeforeLastFrost * 7
            return lastFrost - sowIndoors
        } else {
            return 0
        }
    }

    _getIndoorSowMax = (): number => {
        const lastFrost = this.station._getLastFrost()
        if (this.plant.sowOutdoorsBeforeLastFrost) {
            return lastFrost - 7 * this.plant.sowOutdoorsBeforeLastFrost
        } else {
            return lastFrost
        }
    }

    _getSowOutdoorMin = (): number => {
        return this._getIndoorSowMax()
    }

    _getSowOutdoorMax = (): number => {
        const firstFrost = this.station._getFirstFrost()
        const sowOutdoorsMin = this._getSowOutdoorMin()
        if (this.plant.sowOutdoorsBeforeFirstFrost) {
            return (
                firstFrost -
                7 * this.plant.sowOutdoorsBeforeFirstFrost -
                sowOutdoorsMin
            )
        } else {
            return 0
        }
    }

    _getHarvestMin = (): number => {
        const sowMin = this._getIndoorSowMin()
        const lastFrost = this.station._getLastFrost()
        const firstNum = sowMin > 0 ? sowMin : lastFrost
        return firstNum + this.plant.minDaysToMaturity
    }

    _getHarvestMax = (): number => {
        const harvestMin = this._getHarvestMin()
        const firstFrost = this.station._getFirstFrost()
        const diff = firstFrost - harvestMin
        // const harvestMax = this.plant.sowIndoorsBeforeLastFrost > 6 ? 7 : 0
        return diff
    }

    getHarvestCoords = () => {
        const harvestMin = this._getHarvestMin()
        const harvestMax = this._getHarvestMax()
        return {
            x: this.plant.id,
            y0: harvestMin,
            y: harvestMax,
        }
    }

    getSowIndoorCoords = () => {
        const sowIndoorsMin = this._getIndoorSowMin()
        const sowIndoorsMax = sowIndoorsMin
            ? this._getIndoorSowMax() - sowIndoorsMin
            : 0
        // return sowIndoorsMin > 0 ? {
        //     x: this.plant.id,
        //     y0: getDate(sowIndoorsMin),
        //     y: getDate(sowIndoorsMax)
        // } : {x: this.plant.id, y: getDate(0)} ;
        return { x: this.plant.id, y0: sowIndoorsMin, y: sowIndoorsMax }
    }

    getSowOutdoorCoords = () => {
        const sowOutdoorsMin = this._getSowOutdoorMin()
        const sowOutdoorsMax = this._getSowOutdoorMax()
        // console.log('outdoormin', this.plant.commonName, sowOutdoorsMin, getDate(sowOutdoorsMin))
        // console.log('outdoormax', this.plant.commonName, sowOutdoorsMax, getDate(sowOutdoorsMax))
        // return {
        //     x: this.plant.id,
        //     y0: getDate(sowOutdoorsMin), // baseline date
        //     y: getDate(sowOutdoorsMax) // days to add to baseline
        // };
        return { x: this.plant.id, y0: sowOutdoorsMin, y: sowOutdoorsMax }
    }
}
