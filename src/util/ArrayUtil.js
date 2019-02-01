var React = require('react-native');

import _ from 'lodash';

export default class ArrayUtil {

    static immurateReverse(source) {
        if (source == null || source == undefined) {
            return source;
        }

        if (_.isArray(source) === false) {
            return source;
        }

        let ret = _.clone(source);

        return ret.reverse();
    }


    static copyReverseArray(input, output) {
        if (input == null || input == undefined) {
            return;
        }

        if (_.isArray(input) === false) {
            return;
        }

        if (output == null || output == undefined) {
            return;
        }

        if (_.isArray(output) === false) {
            return;
        }

        output.splice(0, output.length);

        for (let i = input.length - 1; i >= 0; i--) {
            output.push(input[i]);
        }


    }


}