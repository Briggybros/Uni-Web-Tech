import { combineReducers } from 'redux';

import { userReducer as user } from './reducers/userReducer';
import { newsReducer as news } from './reducers/newsReducer';

export default combineReducers({
    user,
    news,
});
