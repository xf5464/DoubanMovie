import React from 'react';
import moment from 'moment'

export default class TimeUtil {


    static getCurrentTimeStamp() {
        return moment.unix(new Date().getTime()/1000)._i;
    }
}