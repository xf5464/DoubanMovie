import React from 'react';
import _ from 'lodash';

export default class StringUtil {

    static substitute(s, param) {

        if (s == null || s == undefined) {
            return '';
        }

        if (!_.isString(s)) {
            return '';
        }

        if (param == null || param == undefined) {
            return s;
        }

        if (!_.isArray(param)) {
            return s;
        }

        let m = s;

        for (var i = 0; i < param.length; i++) {
            m = m.replace('{' + i + '}', param[i])
        }

        return m;
    }

    //小于10000的按原数显示，大于10000的按XXX万.x显示
    static getCountStringForDisplay(count) {

        if (count < 10000) {
            return count.toString();
        }

        let num1 = Number.parseInt(count/10000);

        let num2 = Number.parseInt((count - num1*10000)/1000);

        if (num2 == 0) {
            return num1 + "万";
        }
        else
        {
            return num1 + "." + num2 + "万";
        }

    }
}