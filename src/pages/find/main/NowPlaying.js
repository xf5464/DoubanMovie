import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ScreenUtil from 'utils/ScreenUtil';
import * as api from 'src/services/DoubanApi';

export default class NowPlaying extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalCount: -1,
            removeApi: api.NOW_PLAYING_MOVIE,
            movieList: [],
            isOnRefreshing: false,
            itemWidth: (ScreenUtil.getScreenWidth() - ScreenUtil.scale(3) * 2),
            nowLoadNum: 0,
            listColumnNum: 1,
            eachTimeLoadCount: 10,
            originalListData: [],
            firstTimeLoadCount: 12 * 2,
            needScrollFlag: false,//每次获取了数据了之后滚动
            initialScrollIndex: (12 * 2 / 3 - 1),
            hasScrolled: false
        };
    }


    render() {
        return <View style={{flex: 1}}><Text>now playing</Text></View>;
    }

}