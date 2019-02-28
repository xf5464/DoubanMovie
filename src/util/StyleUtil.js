import {StyleSheet} from "react-native";
import ScreenUtil from 'src/util/ScreenUtil'

const commonStyles = StyleSheet.create({

    IconStyle32_32: {
        width:ScreenUtil.scale(32),
        height:ScreenUtil.scale(32),
    },
    IconStyle48_48:{
        width:ScreenUtil.scale(48),
        height:ScreenUtil.scale(48),
    },
    IconStyle64_64:{
        width:ScreenUtil.scale(64),
        height:ScreenUtil.scale(64),
    },
    HEAD_VIEW_1: {
        width: ScreenUtil.getScreenWidth(),
        height: ScreenUtil.scale(50),
        backgroundColor: '#000000',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    HEAD_VIEW_2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
});

export default commonStyles;
