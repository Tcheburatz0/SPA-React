import {combineReducers, createStore, applyMiddleware} from "redux";
import UsersReducer from "./users-reducer";
import thunk from 'redux-thunk';
import AuthReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'

const reducers = combineReducers({
      users: UsersReducer,
      auth: AuthReducer,
      form: formReducer,
    }
)

const store = createStore(reducers, applyMiddleware(thunk));

export default store;