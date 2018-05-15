// @flow
export interface ServiceInterface {
    endpoint(): string;
    baseUrl(): string;
}

export interface PlantServiceInterface extends ServiceInterface {
    getAll(): Promise<*>;
}

export interface WeatherServiceInterface extends ServiceInterface {
    getStation(zipCode: string): Promise<*>;
}
