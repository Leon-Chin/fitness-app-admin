import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './account.store'
import globalReducer from './global.store'

const rootReducer = combineReducers({
    account: accountReducer,
    global: globalReducer,
});

export default rootReducer;