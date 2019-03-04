import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Button = require('./Button');


export default class TopBarButton extends React.Component {


    propTypes: {
        viewStyle: PropTypes.array,
        tabName: PropTypes.string,
        textColor: PropTypes.string,
        onPressHandler: PropTypes.func,
        textStyle: Text.propTypes.style,
        page: PropTypes.int,
        fontWeight: PropTypes.string,
        textLayoutCallback: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.onLayoutCalled = this.onLayoutCalled.bind(this);
    }

    componentDidMount() {

    }

    onLayoutCalled(event) {
        // console.log(event.nativeEvent.layout);

        const {textLayoutCallback} = this.props;

        textLayoutCallback(event.nativeEvent.layout);
    }

    render() {
        const {tabName, page, onPressHandler, textColor, viewStyle, textStyle, fontWeight} = this.props;

        return <Button
            style={{flex: 1,}}
            key={tabName}
            accessible={true}
            accessibilityLabel={tabName}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={viewStyle}>
                <Text onLayout={this.onLayoutCalled} style={[{color: textColor, fontWeight,}, textStyle,]}>
                    {tabName}
                </Text>
            </View>
        </Button>;
    }
}