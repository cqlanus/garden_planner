import type { StationType, Plant } from '../types'
import { Station } from './'

export class Crop {
    constructor(plant: Plant, station: StationType) {
        this.plant = plant
        this.station = new Station(station)
    }

    _getIndoorSowMin = (): number => {
        const lastFrost = this.station._getLastFrost()
        const dontSowIndoors = 0
        if (this.plant.sowIndoorsBeforeLastFrost) {
            const sowIndoorsDay = this.plant.sowIndoorsBeforeLastFrost * 7
            const sowOnDayOne = 1
            return lastFrost - sowIndoorsDay >= 0
                ? lastFrost - sowIndoorsDay
                : sowOnDayOne
        } else {
            return dontSowIndoors
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
        if (this.plant.sowOutdoorsBeforeFirstFrost) {
            // if (this.plant.baseGdd && this.plant.baseGdd < 45) {
            //     return 366 / 2
            // }
            return firstFrost - 7 * this.plant.sowOutdoorsBeforeFirstFrost
        } else {
            return this.station._getLastFrost()
        }
    }

    _getHarvestMin = (): number => {
        const sowMin = this._getIndoorSowMin()
        const lastFrost = this.station._getLastFrost()
        const canSowIndoors = sowMin > 0
        const earliestSowDay = canSowIndoors ? sowMin : lastFrost
        return earliestSowDay + this.plant.minDaysToMaturity
    }

    _getHarvestMax = (): number => {
        const firstFrost = this.station._getFirstFrost()
        const latestSow = this._getSowOutdoorMax()
        const maxHarvest = latestSow + this.plant.maxDaysToMaturity
        return maxHarvest > firstFrost || !this.plant.maxDaysToMaturity
            ? firstFrost
            : maxHarvest
    }

    getHarvestCoords = () => {
        const harvestMin = this._getHarvestMin()
        const harvestMax = this._getHarvestMax() - harvestMin
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
        return { x: this.plant.id, y0: sowIndoorsMin, y: sowIndoorsMax }
    }

    getSowOutdoorCoords = () => {
        const sowOutdoorsMin = this._getSowOutdoorMin()
        const sowOutdoorsMax =
            this._getSowOutdoorMax() - sowOutdoorsMin > 0
                ? this._getSowOutdoorMax() - sowOutdoorsMin
                : 0
        return { x: this.plant.id, y0: sowOutdoorsMin, y: sowOutdoorsMax }
    }
}
