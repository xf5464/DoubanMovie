/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStore} from 'redux';
import Root from "./src/Root";
import configureStore from './src/store/ConfigureStore';
import { Provider } from 'react-redux';


const store = configureStore();

export default class App extends Component {
  render() {
    return  <Root/>;

  }
}

