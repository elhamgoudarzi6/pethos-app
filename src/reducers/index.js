import {combineReducers} from 'redux';
import AuthUserReducer from './AuthUserReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    AuthUser:AuthUserReducer,
    UserReducer:UserReducer,
})
