import React from 'react';

import {Geolocation} from "react-native-amap-geolocation";
import {PermissionsAndroid} from "react-native";

export default class LocationUtil extends React.Component {

    static async getLocation(onGetLocation) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await Geolocation.init({
                ios: "9bd6c82e77583020a73ef1af59d0c759",
                android: "152916bfb90ba03569f7e1ee1720f160"
            });

            Geolocation.setOptions({
                interval: 8000,
                distanceFilter: 20
            });

            Geolocation.addLocationListener((location) => {Geolocation.stop(); onGetLocation(location)});
            Geolocation.start();
        }
    }
}