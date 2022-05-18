import { configureStore } from '@reduxjs/toolkit'
import poemsReducer from './poems';

//I know I could have just one reducer for the current size of the app but I'm putting it here for later scalability.

const store = configureStore({reducer: {
  promptAndPoem: poemsReducer}
});

export default store;
