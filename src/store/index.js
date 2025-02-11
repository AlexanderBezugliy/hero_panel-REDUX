import { createStore } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';

import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';



const store = createStore(combineReducers({
    heroesReducer: heroesReducer,
    filtersReducer: filtersReducer
}), 
    //для подключения девтулза
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;