import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';
import SearchCityPanel from './SearchCityPanel';
import ChinaCity from './ChinaCity';

const App = createStackNavigator({
    SEARCH_CITY_MAIN_TAB: {
        screen: SearchCityPanel,

        navigationOptions:  {
            header: null
        }
    },

    SEARCH_CITY_OF_PROVINCE_TAB: {
        screen: ChinaCity,
        navigationOptions: {
            header: null
        }
    },

}, {
    headerLayoutPreset: 'center',
});

const styles = StyleSheet.create({});


export default createAppContainer(App);