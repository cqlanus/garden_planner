// @flow
import { Endpoint, PlantServiceInterface } from '../'
import { api, HTTPMethod } from '../APIManager'

export class PlantService implements PlantServiceInterface {
    baseUrl = () => 'https://crops-api.herokuapp.com/api'
    endpoint = () => Endpoint.plants()

    getAll = async () => {
        const url = this.baseUrl() + this.endpoint()
        const response = await fetch(url, {
            headers: api.header(),
            method: HTTPMethod.GET,
        })
        return await response.json()
    }
}
