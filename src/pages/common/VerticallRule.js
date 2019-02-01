import React from 'react';
import {View} from 'react-native';
import { ViewStyle,ViewPropTypes } from 'react-native'
import ScreenUtil from 'util/ScreenUtil';

export default class HorizontalRule extends React.Component {

    propTypes = {
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
                backgroundColor: '#e2e3e4',
                width: ScreenUtil.scale(2),
            }, lineStyle]}
        />
    }
}