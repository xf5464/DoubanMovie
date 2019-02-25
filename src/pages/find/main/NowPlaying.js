import React from 'react';
import NowPlayingClass from "./NowPlayingClass";
import {connect} from "react-redux";


export default connect(
    (state) => ({
        cityName: state.selectPlayingCityReducer.cityName
    }),
    (dispatch) => ({


    })
)(NowPlayingClass);