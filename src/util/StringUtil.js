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
}