import { configureStore } from '@reduxjs/toolkit'

const UPDATE_USERNAME = 'UPDATE_USERNAME';

// Action creators
export const updateUsername = (newUsername) => ({
  type: UPDATE_USERNAME,
  payload: newUsername,
});

// Initial states
const initialUserState = {
    username: "Ministry",
};

// Reducers
const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case UPDATE_USERNAME:
        return { ...state, username: action.payload };
      default:
        return state;
    }
};


export default configureStore({
  reducer: {
    user : userReducer,
  },
})