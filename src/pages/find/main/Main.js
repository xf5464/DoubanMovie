import React from 'react';
import {Alert, Keyboa, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import ScreenUtil from 'src/util/ScreenUtil';
import {connect} from 'react-redux';
import {ChangeMainBarVisibleAction} from 'src/redux/actions/ChangeMainBarVisibleAction';
import {FindMovieTabChangeAction} from 'src/redux/actions/FindMovieTabChangeAction';
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
                console.log('Main illFocus', payload);
            }
        );

        const didBlurSubscription1 = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.log('Main didFocus', payload);
            }
        );

        const didBlurSubscription2 = this.props.navigation.addListener(
            'willBlur',
            payload => {
                console.log('Main willBlur', payload);
            }
        );

        const didBlurSubscription3 = this.props.navigation.addListener(
            'didBlur',
            payload => {
                console.log('Main didBlur', payload);
            }
        );
    }

    componentWillUnmount() {
    }

    testChangeTab(obj) {
        const {i, ref} = obj;

        let tabView = this.refs[ref.ref];

        const {findMovieTabChangeHandler} = this.props;

        findMovieTabChangeHandler(ref.ref);
        // tabView.tabToggle();
        console.log(obj);
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
                                   onChangeTab={(obj)=>{this.testChangeTab(obj)}}
                                   tabBarUnderlineStyle={{backgroundColor: '#494949',height: ScreenUtil.scale(2)}}>

                    <NowPlaying tabLabel={'正在上映'} ref={'nowPlayingTab'}/>

                    <NextPlaying  tabLabel={'即将上映'} ref={'nextPlayingTab'}/>

                </ScrollableTabView>
            </View>

        </View>
    }

}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {hideBottomBarHandler: ()=> dispatch(ChangeMainBarVisibleAction(true)),
            findMovieTabChangeHandler: (tabName) => dispatch(FindMovieTabChangeAction(tabName))};
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