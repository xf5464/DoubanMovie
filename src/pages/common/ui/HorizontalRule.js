import React from 'react';
import {View} from 'react-native';
import { ViewStyle,ViewPropTypes,StyleSheet } from 'react-native';
import ScreenUtil from "src/util/ScreenUtil";


export default class HorizontalRule extends React.Component {

    static propTypes = {

        lineStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
    };

    constructor(props){
        super(props);

    }


    render() {

        const {
            lineStyle
        } = this.props;

        return <View
            style={[{
                borderBottomColor: '#e2e3e4',
                borderBottomWidth: ScreenUtil.scale(1)//StyleSheet.hairlineWidth,//ScreenUtil.scale(1),
            }, lineStyle]}
        />
    }
}