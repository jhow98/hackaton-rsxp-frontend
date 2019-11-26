import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation-stack';

import {
    createSwitchNavigator,
    createAppContainer,
  } from "react-navigation";

import { Root } from "native-base";
// import Login from './Login/Login';
import MainScreen from './screens/Main';

import { AsyncStorage, InteractionManager, ActivityIndicator } from "react-native";

class AuthHandler extends Component {
  handleAuth = async () => {
    let routeName;

    let token = await AsyncStorage.getItem('token')
    if (token) {
      routeName = "Default";
    } else {
      routeName = "Login";
    }

    this.props.navigation.navigate(routeName);
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.handleAuth);
  }

  render() {
    return <ActivityIndicator />;
  }
}

const Default = createStackNavigator(
  {
    General: { screen: MainScreen },
  },
  {
    index: 0,
    initialRouteName: "General",
    headerMode: "none",
  },
);

const Switch = createSwitchNavigator(
  {
    // AuthHandler: { screen: AuthHandler },
    // Login: { screen: Login },
    Default: { screen: Default },
  },
  {
    index: 0,
    initialRouteName: "Default",
    headerMode: "none",
  },
);

const App = createAppContainer(Switch);

export default () => (
  <Root>
    <App renderLoadingExperimental={() => <ActivityIndicator />} />
  </Root>
);
