import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';

import ScreenUtil from 'utils/ScreenUtil';
import Main from './main/Main';
import searchCity from './searchcity/SearchCity';
import searchMovie from './searchmovie/SearchMovie';

const App = createStackNavigator({
    FIND_MAIN_TAB: {
        screen: Main,
        navigationOptions: {
            header: null
        }
    },
    FIND_SEARCH_CITY_TAB: {
        screen: searchCity,
        navigationOptions: {
            header: null
        }
    },
    FIND_SEARCH_MOVIE_TAB: {
        screen: searchMovie,
        navigationOptions: {
            header: null
        }
    }

}, {
    headerLayoutPreset: 'center'
});

const styles = StyleSheet.create({

})


export default FindStack = createAppContainer(App);