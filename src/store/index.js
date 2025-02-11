import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import { thunk } from 'redux-thunk'; 
import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';



// const store = createStore(combineReducers({
//     heroesReducer: heroesReducer,
//     filtersReducer: filtersReducer
// }), 
//     //для подключения девтулза
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Комбинируем редьюсеры
const rootReducer = combineReducers({
    heroesReducer: heroesReducer,
    filtersReducer: filtersReducer
});
//для подключения девтулза
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));




export default store;