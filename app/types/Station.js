// @flow
export type StationType = {
    daily: {
        minTemps: Array<number>,
        maxTemps: Array<number>,
        dailyGdd40: Array<number>,
        dailyGdd50: Array<number>,
    },
    station: {
        last_frost_50: string,
        first_frost_50: string
    }
};