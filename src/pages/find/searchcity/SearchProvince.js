import React from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AweIcon from 'react-native-vector-icons/FontAwesome5';
import ScreenUtil from "src/util/ScreenUtil";
import HorizontalRule from "src/pages/common/ui/HorizontalRule";
import China from "./China";
import Overseas from "./Overseas";
import ScrollableTabView,{DefaultTabBar} from "react-native-scrollable-tab-view";
import {connect} from 'react-redux';
import {ChangeMainBarVisibleAction} from "src/redux/actions/ChangeMainBarVisibleAction";
import * as StackNavigatorName from "src/constant/StackNavigatorName";
import CustomTopBar from "./bar/CustomTopBar";

class SearchProvince extends React.Component {

    constructor(props) {
        super(props);

        this._goBack = this._goBack.bind(this);

        this._updateSelectIndex = this._updateSelectIndex.bind(this);

        this.textLayoutCallback = this.textLayoutCallback.bind(this);

        this.state = {
            selectTabIndex: 0,
            labelTipLeft: 0
        };
    }

    componentWillMount() {
        const didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                // console.log('willFocus', payload);
            }
        );

        const didBlurSubscription1 = this.props.navigation.addListener(
            'didFocus',
            payload => {
                // console.log('didFocus', payload);
            }
        );

        const didBlurSubscription2 = this.props.navigation.addListener(
            'willBlur',
            payload => {
                // console.log('willBlur', payload);
            }
        );

        const didBlurSubscription3 = this.props.navigation.addListener(
            'didBlur',
            payload => {
                // console.log('didBlur', payload);
            }
        );
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    _goBack() {
        const {hideBottomBarHandler} = this.props;

        hideBottomBarHandler(false);

        this.props.navigation.navigate(StackNavigatorName.FIND_MAIN_TAB);
    }

    _updateSelectIndex(value) {
        this.setState({selectTabIndex: value});
    }

    _testChangeTab(obj) {

    }

    textLayoutCallback(layout) {
        // console.log(layout);

        this.setState({labelTipLeft:layout.x});
    }

    render() {

        let self = this;

        return <View style={{flex: 1}}>
            <View  style={{flexDirection: 'row', width: '100%', alignItems: 'center', height: 50}}>

                <TouchableOpacity onPress={() => {this._goBack()}}>
                    <View  style={{flexDirection: 'row', width: ScreenUtil.scale(this.state.labelTipLeft), height:'100%', alignItems: 'center'}}>
                        <AweIcon name={'chevron-left'} color={'#42bd56'} size={ScreenUtil.scale(26)}
                                 style={{position: 'absolute', left: ScreenUtil.scale(20)}} />
                    </View>
                </TouchableOpacity>

                <Text style={{position: 'absolute', left: this.state.labelTipLeft, fontSize: ScreenUtil.scale(18)}}>选择城市</Text>
  {/*              <ButtonGroup
                    onPress={this._updateSelectIndex}
                    selectedIndex={this.state.selectTabIndex}
                    buttons={["国内", "海外"]}
                    containerStyle={{height: 40, width: 200, borderColor: '#494949'}}
                    selectedButtonStyle={{backgroundColor: '#494949'}}
                    textStyle={{fontSize: ScreenUtil.scale(16)}} />*/}

            </View>

            <HorizontalRule lineStyle={{marginTop: 5, borderBottomColor: '#b2b2b2', borderBottomWidth: StyleSheet.hairlineWidth}}/>

            <ScrollableTabView style={{flex: 1}}
                               ref={'tabScrollView'}
                               tabBarTextStyle={{fontSize:ScreenUtil.scale(16), alignItems: 'center'}}
                               tabBarActiveTextColor={'#9fdaac'}
                               tabBarInactiveTextColor={'#9b9b9b'}
                               onChangeTab={(obj)=>{this._testChangeTab(obj)}}
                               renderTabBar={() => {return <CustomTopBar textLayoutCallback={self.textLayoutCallback} tabStyle={{ paddingBottom: 0}}/>;}}
                               tabBarUnderlineStyle={{backgroundColor: '#5aad65',height: ScreenUtil.scale(2)}}>

                <China tabLabel={'国内'} goBackToMain={this._goBack}/>

                <Overseas  tabLabel={'海外'}/>

            </ScrollableTabView>
        </View>
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {hideBottomBarHandler: (value)=> dispatch(ChangeMainBarVisibleAction(value))};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProvince);