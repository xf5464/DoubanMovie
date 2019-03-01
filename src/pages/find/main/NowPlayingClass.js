import React from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import ScreenUtil from 'src/util/ScreenUtil';
import StringUtil from 'src/util/StringUtil';
import * as api from 'src/services/DoubanApi';
import PulldownFlatList from "src/pages/common/ui/PulldownFlatList";
import LocalStorage from "src/util/logic/LocalStorage";
import {Button, Rating} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import TimeUtil from "../../../util/TimeUtil";

const START_IMAGE = require('../../../res/images/star.png');

export default class NowPlaying extends PulldownFlatList {


    constructor(props) {
        super(props);

        this.state.remoteApi = api.NOW_PLAYING_MOVIE;

        this.state.rightContentHeight = 110;

        this.state.tabName = "NowPlaying";

        this.state.cacheValidTime = 60;

        // LocalStorage.clear();
    }

    async tryLoad(url) {
        // return;

        let t = this.hasLoadAllDataForList();

        if (t) {
            this.setState({isOnRefreshing: false});

            return;
        }

        const currentTimestamp = new Date().getTime();

        if (currentTimestamp - this.state.lastLoadTime <= 1000) {
            this.finishLoadHandler();

            return;
        }

        this.state.lastLoadTime = currentTimestamp;

        console.log("开始加载 " + url);

        //读出来的，应该是数据加读取时间，然后时间跟现在判断下是不是超过一个间隔，超过的话去重新读

        let val = await AsyncStorage.getItem(this.state.tabName);

        let isEmpty = this.state.saveList.length == 0;

        let m1 = null;

        if (this.state.needLoadCache) {

            if (isEmpty) {

                if (val != null) {

                    m1 = JSON.parse(val);

                    // console.log(val);

                    let loadTime = m1.loadTime;

                    let now = TimeUtil.getTimeStampSeconds();

                    if (now - loadTime >= this.state.cacheValidTime) {
                        console.log("timeout now:" + now + " loadTime:" + loadTime);

                        let remove = await AsyncStorage.removeItem(this.state.tabName);

                        m1 = null;
                    }
                    else {
                        console.log("timeValid now:" + now + " loadTime:" + loadTime);
                    }
                }

            }
        }


        ret = null;

        if (m1) {
            ret = m1[url];
        }

        // return;

        // let val = await AsyncStorage.getItem(url);

        if (ret != null) {

            setTimeout(() => {
                console.log("读到缓存:" + url);

                this.handleResponse(url, ret, {fromCache: true});

                this.finishLoadHandler();
            }, 1000)

        }
        else {
            super.tryLoad(url);
        }


    }

    onTabToggle() {
        console.log('on toggle tab');
    }

    getFullUrl(remoteUrl) {

        const {cityName} = this.props;

        url = StringUtil.substitute(remoteUrl, [cityName, this.loadedNum(), this.state.eachTimeLoadCount]);

        return url;
    }

    //返回新的集合
    async handleResponse(url, data, param) {

        if (data.start < this.state.saveList.length) {
            console.log("dunplicate start:" + data.start + " length:" + data.subjects.length);

            return;
        }

        let isFirstGroup = this.loadedNum() + data.subjects.length <= this.state.eachTimeLoadCount;

        let val = await AsyncStorage.getItem(this.state.tabName);

        if (val == null) {
            val = {};
        }
        else {
            val = JSON.parse(val);
        }

        let isFromCache = param && param != undefined && param.fromCache;

        if (isFirstGroup && !isFromCache) {
            let now = TimeUtil.getTimeStampSeconds();
            val.loadTime = now;
        }

        if (!isFromCache) {

            val[url] = data;

            LocalStorage.set(this.state.tabName, val);

            console.log("set data\n" + JSON.stringify(val));
        }

        let subjects = data.subjects;

        // console.log(JSON.stringify(subjects));

        /*        let ret = [];

                for (let i = 0; i < subjects.length; i++) {
                    ret.push({url: subjects[i].images.medium, title: subjects[i].title})
                }*/

        ret = this.state.saveList.concat(subjects);


        this.setState({
            totalCount: data.total,
            saveList: ret
        });

    };

    calculateRightContentHeight(event) {

        if (this.state.rightContentHeight != 0) {
            return;
        }

        const {height, y} = event.nativeEvent.layout;

        if (height <= 0) {
            return;
        }

        let m = Number.parseInt(height + y, 10);

        this.setState({rightContentHeight: m});

        console.log("parse m:" + m);
    };

    _renderGetButton(item) {

        if (this.state.rightContentHeight == 0) {
            <View></View>
        }
        else {
            return <View style={{
                paddingRight: ScreenUtil.scale(20),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: ScreenUtil.scale(this.state.rightContentHeight)
            }}>
                <Text style={{
                    paddingBottom: 6,
                    color: '#ff6677'
                }}>{StringUtil.getCountStringForDisplay(item.collect_count)}人看过</Text>

                <Button
                    title="购票"
                    type="outline"
                    buttonStyle={{
                        borderColor: '#ff6677',
                        borderWidth: ScreenUtil.scale(1),
                        width: ScreenUtil.scale(65),
                        height: ScreenUtil.scale(35)
                    }}
                    titleStyle={{color: '#ff6677'}}
                />
            </View>
        }


    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps:' + JSON.stringify(nextProps) + " tab:" + this.state.tabName);
    }

    render() {
        const {tabName} = this.props;

        console.log('call render in ' + this.state.tabName + "," + tabName);

        return super.render();
    }

    renderItemHandler(item, separators) {

        let directorNames = "导演：";

        let actorNames = "主演：";

        item.directors.map((one, index) => {

            directorNames += one.name;

            if (index != item.directors.length - 1) {
                directorNames += "/";
            }

        });

        item.casts.map((one, index) => {

            actorNames += one.name;

            if (index != item.casts.length - 1) {
                actorNames += "/";
            }

        });


        return <TouchableHighlight
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={styles.View1}>
                <View style={{paddingLeft: ScreenUtil.scale(20)}}>

                    <FastImage style={{width: ScreenUtil.scale(54 * 1.7), height: ScreenUtil.scale(80 * 1.7)}}
                               source={{uri: item.images.medium}}></FastImage>

                </View>

                <View
                    style={{
                        paddingRight: ScreenUtil.scale(15),
                        // justifyContent: 'space-between',
                        // flexDirection: 'row',
                    }}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={{
                              fontSize: ScreenUtil.scale(16),
                              fontWeight: "bold",
                              width: ScreenUtil.scale(120)
                          }}>{item.title}</Text>

                    <View style={{flexDirection: 'row', paddingTop: ScreenUtil.scale(5), alignItems: 'center'}}>
                        <Rating
                            imageSize={ScreenUtil.scale(16)}
                            type={'custom'}
                            ratingColor={'#faa032'}
                            ratingBackgroundColor={'#e5e5e5'}
                            ratingImage={START_IMAGE}
                            fractions={item.rating.average / 2}
                            startingValue={item.rating.average / 2}
                            readonly/>

                        <Text style={{
                            paddingLeft: ScreenUtil.scale(3),
                            color: '#9b9b9b',
                            fontSize: ScreenUtil.scale(14)
                        }}>{item.rating.average}</Text>

                    </View>

                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={{
                              fontSize: ScreenUtil.scale(14),
                              width: ScreenUtil.scale(120),
                              color: '#b0b0b0',
                              paddingTop: ScreenUtil.scale(5)
                          }}>
                        {
                            directorNames
                        }
                    </Text>

                    <Text numberOfLines={2} ellipsizeMode={'tail'}
                        // onLayout={(event) => this.calculateRightContentHeight.bind(this)(event)}
                          style={{
                              fontSize: ScreenUtil.scale(14),
                              width: ScreenUtil.scale(140),
                              color: '#b0b0b0',
                              paddingTop: ScreenUtil.scale(5)
                          }}>{actorNames}</Text>
                </View>

                {this._renderGetButton.bind(this)(item)}


            </View>
        </TouchableHighlight>
    }

}

const styles = StyleSheet.create({
    View1: {
        height: ScreenUtil.scale(170),
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        width: '100%'
    }
});