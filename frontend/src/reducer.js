import { combineReducers } from 'redux';

import Public from './public/reducer';

import { authReducer as auth } from './auth/reducer';

export default combineReducers({
    Public,
    auth,
});
