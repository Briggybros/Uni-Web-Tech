import { combineReducers } from 'redux';

import { authReducer as auth } from './auth/reducer';
import { newsReducer as news } from './news/reducer';

export default combineReducers({
    auth,
    news,
});
