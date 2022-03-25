import { combineReducers } from 'redux';

import app from './app';
import authenticator from './authenticator';

const reducers = combineReducers({
    app,
    authenticator,
});

export default reducers;
