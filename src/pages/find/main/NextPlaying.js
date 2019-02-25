import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import NowPlaying from  "./NowPlayingClass";
import * as api from 'src/services/DoubanApi';

class NextPlaying extends NowPlaying {

    constructor(props) {
        super(props);

        this.state.remoteApi = api.NEXT_PLAYING_MOVIE;
    }
}

export default connect(
    (state) => ({
        cityName: state.selectPlayingCityReducer.cityName
    }),
    (dispatch) => ({


    })
)(NextPlaying);