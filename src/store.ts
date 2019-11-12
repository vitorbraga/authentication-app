import { compose, createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
import { authenticationReducer } from './modules/authentication/reducer';
import { userReducer } from './modules/user/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistConfig = { key: 'root', storage };

const initialState: AppState = {
    authentication: {
        authToken: null
    },
    user: {
        userId: null,
        user: null
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, initialState, composeEnhancers());
const persistor = persistStore(store);

export { store, persistor };
