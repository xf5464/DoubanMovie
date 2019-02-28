import React from 'react';
import {AsyncStorage, Text, TouchableHighlight, View, Image, StyleSheet} from 'react-native';
import ScreenUtil from 'src/util/ScreenUtil';
import StringUtil from 'src/util/StringUtil';
import * as api from 'src/services/DoubanApi';
import PulldownFlatList from "src/pages/common/ui/PulldownFlatList";
import LocalStorage from "src/util/logic/LocalStorage";
import {Rating, Button} from 'react-native-elements';

const START_IMAGE = require('../../../res/images/star.png');

import FastImage from 'react-native-fast-image';

export default class NowPlaying extends PulldownFlatList {


    constructor(props) {
        super(props);

        this.state.remoteApi = api.NOW_PLAYING_MOVIE;

        this.state.rightContentHeight = 110;
    }

    async tryLoad(url) {
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

        let val = await AsyncStorage.getItem(url);//LocalStorage.get(url);

        ret = JSON.parse(val);

        if (ret != null) {

            setTimeout(() => {
                console.log("读到缓存:" + url);

                this.handleResponse(url, ret);

                this.finishLoadHandler();
            }, 1000)

        }
        else {
            super.tryLoad(url);
        }


    }

    getFullUrl(remoteUrl) {

        const {cityName} = this.props;

        url = StringUtil.substitute(remoteUrl, [cityName, this.loadedNum(), this.state.eachTimeLoadCount]);

        return url;
    }

    //返回新的集合
    handleResponse(url, data) {

        if (data.start < this.state.saveList.length) {
            console.log("dunplicate start:" + data.start + " length:" + data.subjects.length);

            return;
        }

        LocalStorage.set(url, data);

        let subjects = data.subjects;

        console.log(JSON.stringify(subjects));

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

        return;

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

    renderItemHandler(item, separators) {


        let self = this;

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
                <View style={{paddingLeft: 20}}>

                    <FastImage style={{width: 54 * 1.7, height: 80 * 1.7}}
                               source={{uri: item.images.medium}}></FastImage>

                </View>

                <View
                    style={{
                        paddingRight: 15,
                        // justifyContent: 'space-between',
                        // flexDirection: 'row',
                    }}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={{fontSize: 16, fontWeight: "bold", width: 120}}>{item.title}</Text>

                    <View style={{flexDirection: 'row', paddingTop: 5, alignItems: 'center'}}>
                        <Rating
                            imageSize={16}
                            type={'custom'}
                            ratingColor={'#faa032'}
                            ratingBackgroundColor={'#e5e5e5'}
                            ratingImage={START_IMAGE}
                            fractions={item.rating.average/2}
                            startingValue={item.rating.average/2}
                            readonly/>

                        <Text style={{paddingLeft: 3, color: '#9b9b9b', fontSize: 14}}>{item.rating.average}</Text>

                    </View>

                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={{fontSize: 14, width: 120, color: '#b0b0b0', paddingTop: 5}}>
                        {
                            directorNames
                        }
                    </Text>

                    <Text numberOfLines={2} ellipsizeMode={'tail'}
                        // onLayout={(event) => this.calculateRightContentHeight.bind(this)(event)}
                          style={{
                              fontSize: 14,
                              width: 140,
                              color: '#b0b0b0',
                              paddingTop: 5
                          }}>{actorNames}</Text>
                </View>

                <View
                    style={{
                        paddingRight: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: self.state.rightContentHeight
                    }}>
                    <Text style={{paddingBottom: 6, color: '#ff6677'}}>{StringUtil.getCountStringForDisplay(item.collect_count)}人看过</Text>

                    <Button
                        title="购票"
                        type="outline"
                        buttonStyle={{borderColor: '#ff6677', borderWidth: ScreenUtil.scale(1), width: 65, height: 35}}
                        titleStyle={{color: '#ff6677'}}
                    />
                </View>


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