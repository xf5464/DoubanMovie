import React from 'react';

import {PermissionsAndroid, StyleSheet, Text, View, TouchableHighlight, Alert, ViewPropTypes} from 'react-native';
import ScreenUtil from "src/util/ScreenUtil";
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {Geolocation} from "react-native-amap-geolocation";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {SelectPlayingCityAction} from 'src/redux/actions/SelectPlayingCityAction';
import {connect} from "react-redux";
import LocationUtil from "src/util/LocationUtil";
import * as StackNavigatorName from "src/constant/StackNavigatorName";


class China extends React.Component {

    propTypes: {
        goBackToMain: PropTypes.func,
    };

    constructor(props) {
        super(props);

        let gap = ScreenUtil.scale(20);

        let itemCount = 3;

        let itemWidth = (ScreenUtil.getScreenWidth() - gap * (itemCount + 1)) / itemCount;

        //热门城市不知道api,写死这里
        let allCities = [
            "北京", "上海", "广州",
            "深圳", "成都", "武汉",
            "杭州", "重庆", "郑州",
            "南京", "西安", "苏州",
            "长沙", "天津", "福州"
        ];

        let hotCities = [];

        let group = [];

        for (let i = 0; i < allCities.length; i++) {

            if (i % itemCount === 0) {
                group = [];

                hotCities.push(group);
            }

            group.push(allCities[i]);
        }

        let itemHeight = itemWidth * 0.4;

        let listHeight = hotCities.length * itemHeight + Math.max(0, hotCities.length - 1) * gap;

        this.state = {
            city: '定位中',
            location: {},
            paddingTop: ScreenUtil.scale(10),
            itemWidth: itemWidth,
            itemHeight: itemHeight,
            itemPaddingLeft: gap,
            hotCities: hotCities,
            listHeight: listHeight
        };

        this.getLocation = this.getLocation.bind(this);
        this.onGetLocation = this.onGetLocation.bind(this);
        this.selectCityClickHanlder = this.selectCityClickHanlder.bind(this);
    }

    componentDidMount() {
        this.getLocation();
    }

    componentWillUnmount () {
        this.isUnmount = true;
    }

    componentDidUpdate(prevProps) {
        // console.log("this.props city name: " + this.props.selectPlayingCityReducer.cityName + " prevProps:" + prevProps.selectPlayingCityReducer.cityName);
    }

    async getLocation() {
        LocationUtil.getLocation(this.onGetLocation);
    }

    onGetLocation(location) {
        if (location.city === undefined) {
            return;
        }

        if (this.isUnmount === true) {
            return;
        }

        this.setState({city: location.city.replace("市", ""), location: location});

        // console.log(location.toString())
    }

    selectCityClickHanlder(name) {

        if (name === "定位中") {

            Alert.alert("请打开定位权限");

            return;
        }

        const {reduxChangeCity} = this.props;

        reduxChangeCity(name);

        const {goBackToMain} = this.props;

        goBackToMain();
    }

    render() {
        return <View>

            <Input placeholder='输入城市名称查询'
                   leftIcon={
                       <AweIcon
                           name='search'
                           size={ScreenUtil.scale(16)}
                           color='#9b9b9b'
                       />
                   }

                   inputStyle={{
                       fontSize: ScreenUtil.scale(16),
                       color: '#9b9b9b',
                       marginTop: ScreenUtil.scale(3),
                       marginLeft: ScreenUtil.scale(10)
                   }}

                   inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}

                   containerStyle={{
                       height: ScreenUtil.scale(40),
                       alignItems: 'center',
                       marginTop: ScreenUtil.scale(7)
                   }}

                   autoCorrect={false}
            />

            <View style={{width: '100%', backgroundColor: '#f4f4f4', flexDirection: 'column'}}>
                <Text
                    style={{
                        marginLeft: this.state.itemPaddingLeft, marginTop: this.state.paddingTop,
                        color: '#bcbcbc', fontSize: ScreenUtil.scale(14)
                    }}>
                    GPS定位城市</Text>

                <TouchableHighlight onPress={() => this.selectCityClickHanlder(this.state.city)}>

                    <View style={{
                        flexDirection: 'row',
                        width: this.state.itemWidth,
                        height: this.state.itemHeight,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: this.state.itemPaddingLeft,
                        marginTop: this.state.paddingTop,
                        backgroundColor: '#ffffff'
                    }}>
                        <EntypoIcon name={'location-pin'} color={'#5da46a'}/>
                        <Text style={{color: '#484848', fontSize: ScreenUtil.scale(16)}}>{this.state.city}</Text>
                    </View>
                </TouchableHighlight>

                <Text
                    style={{
                        marginLeft: this.state.itemPaddingLeft, marginTop: this.state.paddingTop,
                        color: '#bcbcbc', fontSize: ScreenUtil.scale(14)
                    }}>
                    热门城市</Text>

                <View style={{
                    flexDirection: 'column',
                    width: '100%',
                    height: this.state.listHeight,
                    paddingTop: this.state.paddingTop,
                    paddingLeft: this.state.itemPaddingLeft,
                    paddingRight: this.state.itemPaddingLeft,
                    justifyContent: 'space-between'
                }}>
                    {

                        this.state.hotCities.map((v, k) => {
                            return<View key={k}
                                style={{flexDirection: 'row', width: '100%', height:this.state.itemHeight, justifyContent: 'space-between',}}>
                                {
                                    v.map((cityV, cityKey) => {
                                        return  <TouchableHighlight key={cityKey} onPress={() => this.selectCityClickHanlder(cityV)}><View style={{
                                            flexDirection: 'row',
                                            width: this.state.itemWidth,
                                            height: this.state.itemHeight,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#ffffff'
                                        }}>
                                            <Text style={{
                                                color: '#484848',
                                                fontSize: ScreenUtil.scale(16)
                                            }}>{cityV}</Text>
                                        </View></TouchableHighlight>
                                    })
                                }
                            </View>
                        })
                    }
                </View>
            </View>

        </View>
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {reduxChangeCity: (cityName)=> dispatch(SelectPlayingCityAction(cityName))};
};

export default connect(mapStateToProps, mapDispatchToProps)(China);

const style = StyleSheet.create({});