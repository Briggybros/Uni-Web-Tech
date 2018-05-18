import { combineReducers } from 'redux';

import { userReducer as user } from './reducers/userReducer';
import { newsReducer as news } from './reducers/newsReducer';
import { eventReducer as events } from './reducers/eventReducer';

export default combineReducers({
    user,
    news,
    events,
});
