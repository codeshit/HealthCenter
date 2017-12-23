/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
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
import Setting from './src/Views/Setting';
import Login from './src/Views/Login';
import Register from './src/Views/Register';

const store = configStore();

const RouteView = StackNavigator({
  Login:{screen:Login},
  Register:{screen:Register},
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
  Setting: { screen: Setting },
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <Root>
            <RouteView />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}

