import { combineReducers } from 'redux';

import { authReducer as auth } from './public/login/reducer';
import { newsReducer as news } from './public/news/reducer';

export default combineReducers({
    auth,
    news,
});
