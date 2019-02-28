import React from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert, Keyboard} from 'react-native';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import ScreenUtil from 'src/util/ScreenUtil';
import {connect} from 'react-redux';
import {ChangeMainBarVisibleAction} from 'src/redux/actions/ChangeMainBarVisibleAction';
import NowPlaying from "./NowPlaying";
import NextPlaying from "./NextPlaying";
import ScrollableTabView from 'react-native-scrollable-tab-view';

class Main extends React.Component {



    goToSelectCity() {
        Alert.alert('切换城市选择');
    }

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

    componentWillUnmount() {
    }


    render() {
        const {hideBottomBarHandler} = this.props;

        return <View style={{flex: 1}}>
            <View style={{marginLeft: '2%', marginRight: '2%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <TouchableOpacity style={styles.View1} onPress={hideBottomBarHandler}>
                    <Text style={{color: '#494949', fontSize: ScreenUtil.scale(16)}}>杭州</Text>
                    <AweIcon name={'chevron-down'} color={'#494949'} style={{marginLeft: ScreenUtil.scale(5)}}/>
                </TouchableOpacity>

                <Input
                    placeholder='电影/电视剧/影人'
                    leftIcon={
                        <AweIcon
                            name='search'
                            size={ScreenUtil.scale(16)}
                            color='#9b9b9b'
                        />
                    }

                    inputStyle={{fontSize: ScreenUtil.scale(16), color: '#9b9b9b', marginTop: ScreenUtil.scale(3),}}
                    inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}

                    containerStyle={{backgroundColor: '#f5f5f5', height: ScreenUtil.scale(40), alignItems: 'center'}}

                    autoCorrect={false}
                />
            </View>

            <View style={{flex: 1}}>
                <ScrollableTabView style={{flex: 1}}
                                   tabBarTextStyle={{fontSize:ScreenUtil.scale(14)}}
                                   tabBarActiveTextColor={'#4f4f4f'}
                                   tabBarInactiveTextColor={'#9b9b9b'}
                                   tabBarUnderlineStyle={{backgroundColor: '#494949',height: ScreenUtil.scale(2)}}>

                    <NowPlaying tabLabel={'正在上映'}/>

                    <NextPlaying  tabLabel={'即将上映'}/>

                </ScrollableTabView>
            </View>

        </View>
    }

}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {hideBottomBarHandler: ()=> dispatch(ChangeMainBarVisibleAction(true))};
};

/*const mergeProps = (state, dispatch, ownProps) => {
    return ({
        ...ownProps,
        screenProps: {
            ...ownProps.screenProps,
            ...state,
            ...dispatch,
        }
    })
}*/

const styles = StyleSheet.create({
    View1: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);