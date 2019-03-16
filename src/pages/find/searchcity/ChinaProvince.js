import React from 'react';

import {
    Alert,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    UIManager,
    findNodeHandle
} from 'react-native';
import ScreenUtil from "src/util/ScreenUtil";
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {SelectPlayingCityAction} from 'src/redux/actions/SelectPlayingCityAction';
import {connect} from "react-redux";
import LocationUtil from "src/util/LocationUtil";
import HorizontalRule from "src/pages/common/ui/HorizontalRule";
import province from "../../../res/json/province.json";
import cities from "../../../res/json/city.json";

import PropTypes from 'prop-types';


class China extends React.Component {

    propTypes: {
        goBackToMain: PropTypes.func,
        navigateToCityFromProvince: PropTypes.func
    };

    constructor(props) {
        super(props);

        let gap = ScreenUtil.scale(20);

        let itemCountOfOneRow = 3;

        let itemWidth = (ScreenUtil.getScreenWidth() - gap * (itemCountOfOneRow + 1)) / itemCountOfOneRow;

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

            if (i % itemCountOfOneRow === 0) {
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

        let capitalLetters = [];

        for (let i = 0; i < 26; i++) {
            let key = String.fromCharCode(charCodeA + i);

            let value = province[key];

            // console.log("key:" + key + " value:" + (value === undefined ? "undefind" : value.toString()));

            if (value !== undefined) {

                let data = [];

                capitalLetters.push(key);

                value.map((item, index) => {
                    data.push({label: item, isLast: index === value.length - 1})
                });

                provinceData.push({title: key, data: data});

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
            allProvinceItemCount: allProvinceItemCount,
            capitalLetters: capitalLetters,
            panelGlobalY: 0,//这个页面的y
            sectionViewY: -1, ///滚动页面的y
            letterNavigatorHeight: 0,
            couldShowLetters: false
        };

        this.getLocation = this.getLocation.bind(this);
        this.onGetLocation = this.onGetLocation.bind(this);
        this.selectCityClickHandler = this.selectCityClickHandler.bind(this);
        this.getProvinceItemLayout = this.getProvinceItemLayout.bind(this);
        this.onFullPanelLayout = this.onFullPanelLayout.bind(this);
        this.getLetterComponent = this.getLetterComponent.bind(this);
        this.goSelectTargetProvince = this.goSelectTargetProvince.bind(this);
        this.onSectionListLayout = this.onSectionListLayout.bind(this);
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
    }

    selectCityClickHandler(name) {

        if (name === "定位中") {

            Alert.alert("请打开定位权限");

            return;
        }

        const {reduxChangeCity} = this.props;

        reduxChangeCity(name);

        const {goBackToMain} = this.props;

        goBackToMain();
    }

    goToCityOfProvincePanel(provinceName) {
        let config = cities.provinces;

        for (let i = 0; i < config.length; i++) {
            if (config[i].provinceName === provinceName) {
                const {navigateToCityFromProvince} = this.props;

                navigateToCityFromProvince(config[i].citys, provinceName);

                return;
            }
        }
    }

    renderSectionItem(item, index, section) {

        let gapLine = <View/>;

        if (!item.isLast) {
            gapLine = <HorizontalRule lineStyle={{
                borderBottomColor: '#efefef',
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: this.state.itemPaddingLeft,
            }}/>
        }

        return <TouchableOpacity key={index} onPress={() => {
            this.goToCityOfProvincePanel(item.label)
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: ScreenUtil.scale(40),
                width: '100%'
            }}>
                <Text style={{
                    marginLeft: this.state.itemPaddingLeft,
                    color: '#494949',
                    fontSize: ScreenUtil.scale(16),
                    width: '100%'
                }}>{item.label}</Text>
                {gapLine}
            </View>
        </TouchableOpacity>


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

        let separatorHeight = 1;

        let STATE_HEADER = 1;

        let STATE_ITEM = 2;

        let STATE_TAIL = 3;

        let state = STATE_HEADER;

        let m = 0;

        // label = this.state.province[0].title;

        while (i < index) {

            state = STATE_HEADER;

            let temp = this.state.province[m];

            $offset += headHeight;

            // label = this.state.province[m + 1] != null ? this.state.province[m + 1].title : "";

            i++;

            if (i >= index) {

                // label = temp.data[0];

                state = STATE_ITEM;

                break;
            }

            let t1 = i + temp.data.length;

            if (t1 < index) {
                // state = STATE_ITEM;
                $offset += itemHeight * temp.data.length;

                $offset += separatorHeight * Math.max(0, temp.data.length - 1);

                i += temp.data.length;
            }
            else if (t1 === index) {
                state = STATE_TAIL;

                $offset += itemHeight * temp.data.length;

                // label = "tail";

                break;
            }
            else {
                state = STATE_ITEM;

                $offset += itemHeight * (index - i);

                // label = temp.data[index - i];

                break;
            }


            i++;

            state = STATE_HEADER;

            m++;
            // console.log("index:" + index + temp === undefined ? " undefined" : JSON.stringify(temp));
        }

        let $length = state === STATE_HEADER ? headHeight : (state === STATE_TAIL ? 0 : itemHeight);

        return {length: ScreenUtil.scale($length), offset: ScreenUtil.scale($offset), index};
    }

    onFullPanelLayout(event) {

        if (this.state.panelGlobalY !== 0) {
            return;
        }

        // console.log("onFullPanelLayout:" + JSON.stringify(event.nativeEvent.layout));

        let fullPanelRef = this.fullPanelRef;

        const handle = findNodeHandle(fullPanelRef);

        let self = this;

        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            // console.log(x, y, width, height, pageX, pageY);

            let $scrollViewPageY = Number.parseInt(pageY);

            self.setState({letterNavigatorHeight: ScreenUtil.getScreenHeight() - $scrollViewPageY});
        });


    }

    goSelectTargetProvince(letter) {

        if (this.state.sectionViewY === -1) {
            return;
        }


        let index = 0;

        for (let i = 0; i < this.state.province.length; i++) {

            if (letter === this.state.province[i].title) {

                let obj = this.getProvinceItemLayout(null, index);

                let targetPosition = this.state.sectionViewY + obj.offset;

                console.log("targetLetter:" + letter + " sectionViewY:" + this.state.sectionViewY + " offset:" + obj.offset);

                this.scrollViewRef.scrollTo({x: 0, y: targetPosition});

                return;
            }
            else {
                index += 1 + this.state.province[i].data.length + 1;
            }

        }
    }

    onSectionListLayout(event) {

        if (this.state.sectionViewY !== -1) {
            return;
        }

        this.setState({sectionViewY: event.nativeEvent.layout.y});
    }

    getLetterComponent() {

        if (this.state.letterNavigatorHeight === 0) {
            return <View/>
        }

        return <View
            style={{
                flexDirection: 'column',
                width: this.state.itemPaddingLeft,
                height: this.state.letterNavigatorHeight,
                position: 'absolute', right: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {
                this.state.capitalLetters.map((item, index) => {
                    return <TouchableHighlight key={index} onPress={() => {
                        this.goSelectTargetProvince(item)
                    }}>
                        <Text style={{
                            fontWeight: 'bold', color: '#1685fd', width: this.state.itemPaddingLeft,
                            fontSize: ScreenUtil.scale(12), textAlign: 'center',
                        }}>{item}</Text></TouchableHighlight>
                })
            }
        </View>
    }

    render() {
        return <View onLayout={this.onFullPanelLayout}
                     ref={(ref) => {
                         this.fullPanelRef = ref
                     }}>

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

            <ScrollView
                ref={(ref) => {
                    this.scrollViewRef = ref
                }}
                style={{width: '100%', backgroundColor: '#f4f4f4', flexDirection: 'column'}}>
                <Text
                    style={{
                        marginLeft: this.state.itemPaddingLeft, marginTop: this.state.paddingTop,
                        color: '#bcbcbc', fontSize: ScreenUtil.scale(14)
                    }}>
                    GPS定位城市</Text>

                <TouchableHighlight onPress={() => this.selectCityClickHandler(this.state.city)}>

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
                                        return <TouchableOpacity key={cityKey}
                                                                 onPress={() => this.selectCityClickHandler(cityV)}><View
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
                                        </View></TouchableOpacity>
                                    })
                                }
                            </View>
                        })
                    }
                </View>

                <SectionList
                    onLayout={this.onSectionListLayout}
                    renderItem={({item, index, section}) => this.renderSectionItem(item, index, section)}
                    renderSectionHeader={({section: {title}}) => this.renderSectionHeader(title)}
                    sections={this.state.province}
                    keyExtractor={(item, index) => item + index}
                    getItemLayout={this.getItemLayout}
                    initialNumToRender={this.state.allProvinceItemCount}
                    contentContainerStyle={{paddingBottom: ScreenUtil.scale(50)}}
                />

            </ScrollView>

            {this.getLetterComponent()}


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