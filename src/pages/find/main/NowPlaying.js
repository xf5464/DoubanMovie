import React from 'react';
import NowPlayingClass from "./NowPlayingClass";
import {connect} from "react-redux";
import FindMovieTabChangeAction from "src/redux/actions/FindMovieTabChangeAction";


export default connect(
    (state) => ({
        cityName: state.selectPlayingCityReducer.cityName,
        tabName: state.findMovieTabChangeReducer.tabName,
    }),
    (dispatch) => ({


    })
)(NowPlayingClass);