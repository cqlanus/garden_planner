// @flow
import {
    PlantService,
    WeatherService,
    PlantServiceInterface,
    WeatherServiceInterface,
} from '.'

export const HTTPMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

class APIManager {
    plantService: PlantServiceInterface
    weatherService: WeatherServiceInterface

    constructor() {
        this.plantService = new PlantService()
        this.weatherService = new WeatherService()
    }

    header = () => {
        return {
            'Content-Type': 'application/json',
        }
    }
}

export const api = new APIManager()
