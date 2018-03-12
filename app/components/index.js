/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
// export { default as Main } from './Main/Main';
export { default as UserHome } from './UserHome/UserHome';
export { Login, Signup } from './AuthForm/AuthForm';
export { default as AnnualTemps } from './AnnualTemps/AnnualTemps';
export { default as CropBars } from './CropBars/CropBars';
export { default as CropLabel } from './CropLabel/CropLabel';
export { default as TempLabel } from './TempLabel/TempLabel';
