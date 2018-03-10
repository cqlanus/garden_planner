import type { StationType, Plant } from '../types';
import { Station } from './';

export class Crop {
    constructor(plant: Plant, station: StationType) {
        this.plant = plant;
        this.station = new Station(station);
    }

    _getIndoorSowMin = (lastFrost: number): number => {
        if (this.plant.sowIndoorsBeforeLastFrost) {
            const sowIndoors = this.plant.sowIndoorsBeforeLastFrost * 7;
            return lastFrost - sowIndoors;
        } else {
            return 0;
        }
    };

    _getIndoorSowMax = (lastFrost: number): number => {
        if (this.plant.sowOutdoorsBeforeLastFrost) {
            return lastFrost - 7 * this.plant.sowOutdoorsBeforeLastFrost;
        } else {
            return lastFrost;
        }
    };

    _getSowOutdoorMin = (lastFrost: number): number =>
        this._getIndoorSowMax(lastFrost);

    _getSowOutdoorMax = (firstFrost: number, lastFrost: number): number => {
        if (this.plant.sowOutdoorsBeforeFirstFrost) {
            return (
                firstFrost -
                7 * this.plant.sowOutdoorsBeforeFirstFrost -
                this._getSowOutdoorMin(lastFrost)
            );
        } else {
            return 0;
        }
    };

    _getSowIndoorCoords = () => {
        const lastFrost = this.station._getLastFrost();
        const sowIndoorsMin = this._getIndoorSowMin(lastFrost);
        const sowIndoorsMax = sowIndoorsMin
            ? this._getIndoorSowMax(lastFrost) - sowIndoorsMin
            : 0;
        return {
            x: this.plant.id,
            y0: sowIndoorsMin,
            y: sowIndoorsMax
            // y0: new Date(2018, 0, sowIndoorsMin),
            // y: new Date(2018, 0, sowIndoorsMax)
        };
    };

    _getSowOutdoorCoords = () => {
        const lastFrost = this.station._getLastFrost();
        const firstFrost = this.station._getFirstFrost();
        const sowOutdoorsMin = this._getSowOutdoorMin(lastFrost);
        const sowOutdoorMax = this._getSowOutdoorMax(firstFrost, lastFrost);
        return {
            x: this.plant.id,
            y0: sowOutdoorsMin,
            y: sowOutdoorMax
        };
    };
}
