import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import StartApp from './StartApp';
import configureStore from './store/ConfigureStore';
import {Provider} from 'react-redux';

const store = configureStore();

export default class Root extends React.Component {

    render() {
        return (<Provider store={store}>
                    <StartApp/>
                </Provider>);
    }
}