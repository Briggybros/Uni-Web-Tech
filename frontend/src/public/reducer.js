import { combineReducers } from 'redux';

import { newsReducer as news } from './news/reducer';

export default combineReducers({
    news,
});
