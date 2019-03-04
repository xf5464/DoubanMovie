import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ScrollableTabView,{DefaultTabBar} from "react-native-scrollable-tab-view";

export default class TopBar extends ScrollableTabView {

    constructor(props) {
        super(props);

        this.props.renderTabBar = this.renderTabBar;
    }

    renderTabBar(props) {
        let bar = super.renderTabBar(props);

        return bar;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollableContentAndroid: {
        flex: 1,
    },
});