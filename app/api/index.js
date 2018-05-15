// @flow
export { ServiceInterface } from './APIManager'
export { Endpoint } from './Endpoint'
export { Path } from './Path'
export { PlantServiceInterface, WeatherServiceInterface } from './Interfaces'
export { PlantService, WeatherService } from './services'

import { PlantServiceInterface, WeatherServiceInterface } from './Interfaces'

export type APIManagerConfig = {
    plantService: PlantServiceInterface,
    weatherService: WeatherServiceInterface,
}
