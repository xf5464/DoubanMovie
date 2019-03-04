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
import configureStore from 'src/redux/store/ConfigureStore';
import { Provider } from 'react-redux';
import _ from 'lodash'


const store = configureStore();

Text.render = _.wrap(Text.render, function (func, ...args) {
    let originText = func.apply(this, args)
    return React.cloneElement(originText, {allowFontScaling: false})
});
// TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {defaultProps: false});
Text.defaultProps = Object.assign({}, Text.defaultProps, {allowFontScaling: false});

export default class App extends Component {
  render() {
    return  <Root/>;

  }
}

