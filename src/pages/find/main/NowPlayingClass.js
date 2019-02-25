import React from 'react';
import {AsyncStorage, Text, TouchableHighlight, View} from 'react-native';
import ScreenUtil from 'src/util/ScreenUtil';
import StringUtil from 'src/util/StringUtil';
import * as api from 'src/services/DoubanApi';
import PulldownFlatList from "src/pages/common/PulldownFlatList";
import LocalStorage from "src/pages/common/LocalStorage";

export default class NowPlaying extends PulldownFlatList {

    constructor(props) {
        super(props);

        this.state.remoteApi = api.NOW_PLAYING_MOVIE;
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
            }, 2000)

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

        let ret = [];

        for (let i = 0; i < subjects.length; i++) {
            ret.push({url: subjects[i].images.medium, title: subjects[i].title})
        }

        ret = this.state.saveList.concat(ret);

        this.setState({
            totalCount: data.total,
            saveList: ret
        });

    };

    renderItemHandler(item, separators) {

        return <TouchableHighlight
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={{marginBottom: ScreenUtil.scale(2), height: ScreenUtil.scale(40)}}>
                <Text>{item.title}</Text>
            </View>
        </TouchableHighlight>
    }

}