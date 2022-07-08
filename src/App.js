import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigator';
import store from './configureStore';

export default () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
