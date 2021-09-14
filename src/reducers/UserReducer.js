import {
    AUTH_USER,
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    CHANGE_MOBILE_NUMBER,
    GET_TOKEN
  } from "../action/Type";


  const initialState = [];
  // export default function UserReducer(state = { account: {} }, action) {
  //   switch (action.type) {
  //     case GET_ACCOUNT:
  //       return { ...state, loading: true };
  //     case GET_ACCOUNT_SUCCESS:
  //       console.log('reducer action.payload: ' + JSON.stringify(action.payload));
  //       return { ...state, loading: false, account: action.payload.data };
  //     case GET_ACCOUNT_FAIL:
  //       return {
  //         ...state,
  //         loading: false,
  //         error: 'Error while fetching account'
  //       };
  //     default:
  //       return state;
  //   }
  // }


  

  function UserReducer(user = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case AUTH_USER:
        return [...user, payload];
  
      case GET_USER:
        return payload;
  
      case UPDATE_USER:
        return user.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_USER:
        return user.filter(({ id }) => id !== payload.id);
  
      default:
        return user;
    }
  };
  
  export default UserReducer;