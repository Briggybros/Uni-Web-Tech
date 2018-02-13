import { combineReducers } from 'redux';

import { authReducer as auth } from './auth/reducer';

export default combineReducers({
    auth,
});
