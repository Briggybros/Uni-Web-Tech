import { combineReducers } from 'redux';

import { userReducer as user } from './public/login/reducer';
import { newsReducer as news } from './public/news/reducer';

export default combineReducers({
    user,
    news,
});
