import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import ScreenUtil from "../../util/ScreenUtil";
import PropTypes from 'prop-types';

export default class BottomBarIcon extends React.Component {

    static propTypes = {
        iconName: PropTypes.string,
        focused: PropTypes.bool
    };

    render() {
        const {
            iconName,
            focused,
        } = this.props;

        return <AweIcon name={iconName} size={ScreenUtil.scale(25)} color={focused ? '#494949' : '#9b9b9b'}/>
    }
}