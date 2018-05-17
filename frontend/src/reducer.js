import { combineReducers } from 'redux';

import { userReducer as user } from './reducers/userReducer';
import { newsReducer as news } from './reducers/newsReducer';
import { eventReducer as events } from './reducers/eventReducer';
import { pageReducer as pages } from './reducers/pageReducer';

export default combineReducers({
    user,
    news,
    events,
    pages,
});
