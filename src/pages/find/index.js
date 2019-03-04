import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';
import Main from './main/Main';
import SearchCity from './searchcity/SearchProvince';
import searchMovie from './searchmovie/SearchMovie';

const App = createStackNavigator({
    FIND_MAIN_TAB: {
        screen: Main,

        navigationOptions:  {
            header: null
        }
    },

    FIND_SEARCH_CITY_TAB: {
        screen: SearchCity,
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
    headerLayoutPreset: 'center',
});

const styles = StyleSheet.create({});


export default createAppContainer(App);