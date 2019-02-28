import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import { BottomTabBar } from 'react-navigation-tabs';
import {createAppContainer} from "react-navigation";
import {connect} from "react-redux";

class MainTabComponent extends React.Component<Prop, State> {

    render() {

        const {navigation, needHide} = this.props;

        if (needHide) {
            return <View></View>
        }
        else {
            return <BottomTabBar {...this.props}/>;
        }

    }
}

export default connect(
    (state) => ({
        needHide: state.changeMainBarVisibleReducer.needHide
    }),
    (dispatch) => ({


    })
)(MainTabComponent);