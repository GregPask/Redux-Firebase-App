import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';



import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./Reducers/rootReducer";



//Create Store 

const initialState = {};

const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk)
   
))





ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));

