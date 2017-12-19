/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { Provider } from 'react-redux';
import configStore from './src/redux/reducer';
import { StackNavigator } from 'react-navigation';

import Main from './src/Views/Main';

import Doctor from './src/Views/Doctor';
import Doctored from './src/Views/Doctored';
import Doctoring from './src/Views/Doctoring';
import Apply from './src/Views/Apply';

import DataCenter from './src/Views/DataCenter';
import BloodPressure from './src/Views/BloodPressure';
import BloodSugar from './src/Views/BloodSugar';
import Medication from './src/Views/Medication';
import MedHistory from './src/Views/MedHistory';

const store = configStore();

const RouteView = StackNavigator({
  Main: { screen: Main },
  MedHistory: { screen: MedHistory },
  BloodPressure: { screen: BloodPressure },
  Doctor: { screen: Doctor },
  Doctored: { screen: Doctored },
  Doctoring: { screen: Doctoring },
  Apply: { screen: Apply },
  DataCenter: { screen: DataCenter },
  BloodSugar: { screen: BloodSugar },
  Medication: { screen: Medication },
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <RouteView />
        </StyleProvider>
      </Provider>
    );
  }
}

