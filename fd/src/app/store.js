import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

const initialState = {
  auth: {
    status: false,
    userData: null,
  },
};

const saveToLocalStorage = (state) => {
  try {
    const newState = {
      auth: state.auth,
    };
    const serializedState = JSON.stringify(newState);
    localStorage.setItem("ShareHUB", serializedState);
  } catch (e) {
    console.warn(e);
    alert(e.message);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("ShareHUB");
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return initialState;
  }
};

const rootReducer = {
  auth: authSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  const state = store.getState();
  // Save state to local storage
  saveToLocalStorage(state);
});

