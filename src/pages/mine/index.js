import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class index extends React.Component {

    componentWillMount() {
       /* const didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                console.log('mine willFocus', payload);
            }
        );

        const didBlurSubscription1 = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('mine  didFocus', payload);
            }
        );

        const didBlurSubscription2 = this.props.navigation.addListener(
            'willBlur',
            payload => {
                console.log('mine willBlur', payload);
            }
        );

        const didBlurSubscription3 = this.props.navigation.addListener(
            'didBlur',
            payload => {
                console.log('mine  didBlur', payload);
            }
        );*/
    }

    render() {
        return <View>
            <Text>mine</Text>
        </View>;
    }
}