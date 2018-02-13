import { combineReducers } from 'redux';

import { authReducer as auth } from './auth/reducer';
import { newsReducer as news } from './news/reducer';
import { editorReducer as editor } from './editor/reducer';

export default combineReducers({
    auth,
    news,
    editor,
});
