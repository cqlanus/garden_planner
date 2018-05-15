// @flow
import { WeatherServiceInterface, Endpoint, Path } from '../'
import { api, HTTPMethod } from '../APIManager'

export class WeatherService implements WeatherServiceInterface {
    baseUrl = () => 'https://weather-norms.herokuapp.com/api'
    endpoint = () => Endpoint.weather()

    getStation = async (zip: string) => {
        const url = this.baseUrl() + this.endpoint() + Path.zip(zip)
        const response = await fetch(url, {
            headers: api.header(),
            method: HTTPMethod.GET,
        })
        return await response.json()
    }
}
