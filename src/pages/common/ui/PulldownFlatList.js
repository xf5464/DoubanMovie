import React from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import ScreenUtil from 'src/util/ScreenUtil';
import HorizontalRule from "./HorizontalRule";

const axios = require('axios');

export default class PulldownFlatList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalCount: -1,
            remoteApi: "",
            saveList: [],
            isOnRefreshing: false,
            itemWidth: (ScreenUtil.getScreenWidth()),
            listColumnNum: 1,
            eachTimeLoadCount: 10,
            firstTimeLoadCount: 12 * 2,
            needScrollFlag: false,//每次获取了数据了之后滚动
            initialScrollIndex: 0,
            hasScrolled: false,
            lastLoadTime: 0,
            isPullDown: false,
            needLoadCache: true,
            cacheValidTime: 60000,//缓存失效时间秒数
        };

        this.onListRefresh = this.onListRefresh.bind(this);

        this.handleResponse = this.handleResponse.bind(this);

        this.renderItemHandler = this.renderItemHandler.bind(this);

        this.tryLoad = this.tryLoad.bind(this);

        this.loadedNum = this.loadedNum.bind(this);

        this.hasLoadAllDataForList = this.hasLoadAllDataForList.bind(this);

        this.finishLoadHandler = this.finishLoadHandler.bind(this);

        this._tryPullDown = this._tryPullDown.bind(this);
    }

    componentDidMount() {
        this.onListRefresh();
    }

    componentDidU

    getFullUrl(remoteUrl) {
        return "";
    }

    loadedNum() {
        return this.state.saveList.length;
    }

    //返回新的集合
    handleResponse(url, response, param) {

    };

    renderItemHandler(item, separators) {

    }

    tryLoad(url) {
        let self = this;

        axios.get(url)
            .then(function (response) {
                console.log(response);

                if (response.status == 200) {

                    self.handleResponse(url, response.data, {fromCache: false});
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                self.setState({isOnRefreshing: false, isPullDown: false});
            });
    }

    hasLoadAllDataForList() {
        let t1 = this.state.totalCount >= 0;

        let t2 = this.state.totalCount <= this.state.saveList.length;

        if (t1 && t2) {
            return true;
        }

        return false;
    }

    finishLoadHandler() {
        this.setState({isOnRefreshing: false, isPullDown: false});
    }

    onListRefresh() {

        if (this.hasLoadAllDataForList()) {
            return;
        }

        this.setState({isOnRefreshing: true});

        var url = this.state.remoteApi;

        url = this.getFullUrl(url);

        // http://api.douban.com/v2/movie/top250?start=25&count=25
        this.tryLoad(url);
    }

    onViewDrag(e) {

        let paddingToBottom = 5;

        paddingToBottom += e.nativeEvent.layoutMeasurement.height;

        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            // make something...
            if (this.state.isOnRefreshing) {
                return;
            }

            this._tryPullDown();
        }


    }

    _tryPullDown() {
        if (this.hasLoadAllDataForList()) {
            return;
        }

        if (this.state.isPullDown || this.state.isOnRefreshing) {
            return;
        }

        this.setState({isPullDown: true});

        var url = this.state.remoteApi;

        url = this.getFullUrl(url);

        // http://api.douban.com/v2/movie/top250?start=25&count=25
        this.tryLoad(url);
    }

    onListContentSizeChange() {

    }

    _reachEnd() {
        if (this.hasLoadAllDataForList()) {
            return;
        }

        this.onListRefresh();
    }

    _renderFoot() {
        if (this.state.isPullDown) {
            return <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator
                    color={'#000000'}
                    animating={true}
                    size={ScreenUtil.scale(20)}/>

                <Text style={{textAlign: 'center'}}>loading...</Text></View>
        }

        /*     if (this.hasLoadAllDataForList()) {
                 return  <View><Text>已经拉到底了</Text></View>
             }*/

        return <View></View>;
    }

    renderSeparator() {
        return <HorizontalRule/>
    };

    render() {
        return <FlatList
            onScroll={(event) => {
                this.onViewDrag(event)
            }}
            ref='myFlatList'
            style={{paddingLeft: 0, paddingRight: 0}}
            data={this.state.saveList}
            numColumns={this.state.listColumnNum}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={this.onListRefresh}
            inverted={false}
            refreshing={this.state.isOnRefreshing}
            onContentSizeChange={this.onListContentSizeChange}
            /*  onEndReached={this._reachEnd.bind(this)}
              onEndReachedThreshold={50}*/
            ListFooterComponent={this._renderFoot.bind(this)}
            renderItem={({item, separators}) => (
                this.renderItemHandler(item, separators)
            )}
            ItemSeparatorComponent={this.renderSeparator}
        />

        // return <View  style={{
        //     flex: 1, alignItems: 'center',justifyContent: 'center',}}>


        /*{            {this.getLoadComponent()}}*/
        // </View>
    }

}