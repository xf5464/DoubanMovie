import React from 'react';

import {Alert, ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import ScreenUtil from "src/util/ScreenUtil";
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {SelectPlayingCityAction} from 'src/redux/actions/SelectPlayingCityAction';
import {connect} from "react-redux";
import LocationUtil from "src/util/LocationUtil";
import province from "../../../res/json/province.json";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'


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

        let provinceData = [];

        // let capitalLetters = [];

        let charCodeA = 'A'.charCodeAt(0);

        let allProvinceItemCount = 0;

        for (let i = 0; i < 26; i++) {
            let key = String.fromCharCode(charCodeA + i);

            let value = province[key];

            // console.log("key:" + key + " value:" + (value === undefined ? "undefind" : value.toString()));

            if (value != undefined) {
                provinceData.push({title: key, data: value});

                allProvinceItemCount += 1 + value.length + 1;
            }
        }


        this.state = {
            city: '定位中',
            location: {},
            paddingTop: ScreenUtil.scale(10),
            itemWidth: itemWidth,
            itemHeight: itemHeight,
            itemPaddingLeft: gap,
            hotCities: hotCities,
            listHeight: listHeight,
            province: provinceData,
            allProvinceItemCount: allProvinceItemCount
        };

        this.getLocation = this.getLocation.bind(this);
        this.onGetLocation = this.onGetLocation.bind(this);
        this.selectCityClickHanlder = this.selectCityClickHanlder.bind(this);
        this.getProvinceItemLayout = this.getProvinceItemLayout.bind(this);

        this.getItemLayout = sectionListGetItemLayout({
            // The height of the row with rowData at the given sectionIndex and rowIndex
            getItemHeight: (rowData, sectionIndex, rowIndex) => ScreenUtil.scale(40),

            // These four properties are optional
            getSeparatorHeight: () => 0, // The height of your separators
            getSectionHeaderHeight: () => ScreenUtil.scale(25), // The height of your section headers
            getSectionFooterHeight: () => 0, // The height of your section footers
            listHeaderHeight: 0, // The height of your list header
        })

        /*        for (let j = 0; j < 15; j++) {
                    this.getProvinceItemLayout(null, j);
                }*/
    }

    componentDidMount() {
        this.getLocation();
    }

    componentWillUnmount() {
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

    renderSectionItem(item, index, section) {
        return <View style={{
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            alignItems: 'center',
            height: ScreenUtil.scale(40)
        }}>
            <Text style={{marginLeft: this.state.itemPaddingLeft, color: '#494949', fontSize: ScreenUtil.scale(16)}}
                  key={index}>{item}</Text>
        </View>
    }

    renderSectionHeader(title) {
        return <View style={{
            backgroundColor: '#f4f4f4',
            flexDirection: 'row',
            alignItems: 'center',
            height: ScreenUtil.scale(26)
        }}>

            <Text style={{
                marginLeft: this.state.itemPaddingLeft,
                color: '#9b9b9b',
                fontSize: ScreenUtil.scale(14),
                height: ScreenUtil.scale(20)
            }}>{title}</Text></View>
    }

    //可以直接用https://github.com/jsoendermann/rn-section-list-get-item-layout，这里自己试了下
    //在最后一行不显示这里卡了好久，查了下https://stackoverflow.com/questions/46196242/react-native-flatlist-last-item-visibility-issue#
    //contentContainerStyle={{ paddingBottom: 20}} 不过感觉这个方法不是很靠谱，应该是flatlist的bug
    getProvinceItemLayout(data, index) {

        // console.log("index:" + index);
        let i = 0;

        let $offset = 0;

        let headHeight = 25;

        let itemHeight = 40;

        let isHeader = true;

        let isTail = false;

        let STATE_HEADER = 1;

        let STATE_ITEM = 2;

        let STATE_TAIL = 3;

        state = STATE_HEADER;

        let m = 0;

        label = this.state.province[0].title;

        while (i < index) {

            state = STATE_HEADER;

            let temp = this.state.province[m];

            $offset += headHeight;

            label = this.state.province[m + 1] != null ? this.state.province[m + 1].title : "";

            i++;

            if (i >= index) {

                label = temp.data[0];

                state = STATE_ITEM;

                break;
            }

            let t1 = i + temp.data.length;

            if (t1 < index) {
                // state = STATE_ITEM;
                $offset += itemHeight * temp.data.length;

                i += temp.data.length;
            }
            else if (t1 === index) {
                state = STATE_TAIL;

                $offset += itemHeight * temp.data.length;

                label = "tail";

                break;
            }
            else {
                state = STATE_ITEM;

                $offset += itemHeight * (index - i);

                label = temp.data[index - i];

                break;
            }


            i++;

            state = STATE_HEADER;

            m++;
            // console.log("index:" + index + temp === undefined ? " undefined" : JSON.stringify(temp));
        }

        let $length = state == STATE_HEADER ? headHeight : (state == STATE_TAIL ? 0 : itemHeight);

        console.log("index:" + index + " label:" + label + " length:" + $length + " offset:" + $offset);
        return {length: ScreenUtil.scale($length), offset: ScreenUtil.scale($offset), index};
        // console.log("label:" + label + " index:" + index + " isHeader:" + isHeader + " height:" + height);
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

            <ScrollView style={{width: '100%', backgroundColor: '#f4f4f4', flexDirection: 'column'}}>
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
                            return <View key={k}
                                         style={{
                                             flexDirection: 'row',
                                             width: '100%',
                                             height: this.state.itemHeight,
                                             justifyContent: 'space-between',
                                         }}>
                                {
                                    v.map((cityV, cityKey) => {
                                        return <TouchableHighlight key={cityKey}
                                                                   onPress={() => this.selectCityClickHanlder(cityV)}><View
                                            style={{
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

                <SectionList
                    renderItem={({item, index, section}) => this.renderSectionItem(item, index, section)}
                    renderSectionHeader={({section: {title}}) => this.renderSectionHeader(title)}
                    sections={this.state.province}
                    keyExtractor={(item, index) => item + index}
                    getItemLayout={this.getItemLayout}
                    initialNumToRender={this.state.allProvinceItemCount}
                    contentContainerStyle={{paddingBottom: ScreenUtil.scale(50)}}
                />

            </ScrollView>


        </View>
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {reduxChangeCity: (cityName) => dispatch(SelectPlayingCityAction(cityName))};
};

export default connect(mapStateToProps, mapDispatchToProps)(China);

const style = StyleSheet.create({});