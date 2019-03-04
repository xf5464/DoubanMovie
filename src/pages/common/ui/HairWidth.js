import React from 'react';
import {View, Text, Image, StyleSheet, ViewPropTypes} from 'react-native';
import HozizontalRule from "./HorizontalRule";
import ScreenUtil from "../../../util/ScreenUtil";

export default class HairWidth extends HozizontalRule {

    static propTypes = {
        lineStyle: {borderBottomWidth: StyleSheet.hairlineWidth}
    };
}