import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class SearchCity extends React.Component {

    componentWillMount() {
        const didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                console.log('willFocus', payload);
            }
        );

        const didBlurSubscription1 = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('didFocus', payload);
            }
        );

        const didBlurSubscription2 = this.props.navigation.addListener(
            'willBlur',
            payload => {
                console.log('willBlur', payload);
            }
        );

        const didBlurSubscription3 = this.props.navigation.addListener(
            'didBlur',
            payload => {
                console.log('didBlur', payload);
            }
        );
    }

    render() {
        return <View>
            <Text>search city</Text>
        </View>
    }
}