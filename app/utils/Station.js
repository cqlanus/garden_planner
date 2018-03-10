import type { StationType } from '../types';
import { getDayOfYear } from './';

export class Station {
    constructor(station: StationType) {
        this.station = station
    }

    _getLastFrost = () =>
        this.station.station.last_frost_50 !== '-666'
            ? getDayOfYear(this.station.station.last_frost_50)
            : 366 / 2;

    _getFirstFrost = () =>
        this.station.station.first_frost_50 !== '-666'
            ? getDayOfYear(this.station.station.first_frost_50)
            : 366 / 2;
}