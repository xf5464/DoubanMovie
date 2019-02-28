import React from 'react';
import {AsyncStorage} from 'react-native';

export default class LocalStorage {


    static set(key, val) {
        AsyncStorage.setItem(key, JSON.stringify(val))
    }

    static async get(key) {
        let val = await AsyncStorage.getItem(key);


        return JSON.parse(val);
    }

    static remove(key) {
        return AsyncStorage.removeItem(key)
    }

    static clear() {
        return AsyncStorage.clear();
    }
}
