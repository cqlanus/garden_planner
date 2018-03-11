// @flow
export type Plant = {
    sowIndoorsBeforeLastFrost: number | null,
    sowOutdoorsBeforeFirstFrost: number | null,
    sowOutdoorsBeforeLastFrost: number | null,
    transplantBeforeLastFrost: number | null,
    minDaysToMaturity: number,
    maxDaysToMaturity: number,
};