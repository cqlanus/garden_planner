// @flow
export const getDayOfYear = (dateStr: string): number => {
    const [ month, day ] = dateStr.split('/');
    const now = new Date(2018, +month - 1, +day);
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};
