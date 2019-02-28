import React from 'react';
import {View, Text, Image, StyleSheet, Keyboard} from 'react-native';
import InitAppLayer from 'src/InitAppLayer';
import configureStore from 'src/redux/store/ConfigureStore';
import {Provider} from 'react-redux';

const store = configureStore();

export default class Root extends React.Component {


    render() {
        return (<Provider store={store}>
            <InitAppLayer/>
        </Provider>);
    }
}