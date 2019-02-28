import React from 'react';
import {createAppContainer, createBottomTabNavigator} from "react-navigation";
import HotPage from 'src/pages/hot/index';
import MinePage from 'src/pages/mine/index';
import FindIndexPage from 'src/pages/find/index';
import ScreenUtil from 'src/util/ScreenUtil';
import BottomBarIcon from 'src/pages/main/BottomBarIcon';
import {connect} from 'react-redux';
import MainTabBar from "src/MainTabBar";

const AppNavigator = createBottomTabNavigator(

    {

        Find: {
            screen: FindIndexPage,

            navigationOptions: {
                tabBarIcon: ({focused}) => {
                    return <BottomBarIcon iconName={'share-square-o'} focused={focused}/>
                },
                tabBarLabel: '热映',
                //
            }
        },
        Hot: {
            screen: HotPage,

            navigationOptions: {
                tabBarIcon: ({focused}) => {
                    return <BottomBarIcon iconName={'glass'} focused={focused}/>
                },
                tabBarLabel: '找片',
            }
        },
        Mine: {
            screen: MinePage,
            navigationOptions: {
                tabBarIcon: ({focused}) => {
                    return <BottomBarIcon iconName={'clock-o'} focused={focused}/>
                },
                tabBarLabel: '我的',
            },

        }

    },
    {
        initialRouteName: "Find",
        tabBarComponent: MainTabBar,
        tabBarOptions: {
            activeTintColor: '#0a0a0a',
            tabBarVisible: false,
            labelStyle: {
                fontSize: ScreenUtil.scale(14),
            },
            style: {
                backgroundColor: '#f7f7f7',
                //height: 60,
                borderTopWidth: 1,
                borderTopColor: '#b2b2b2'
            }
        }
    }
);

export default connect(
    (state) => ({
        needHide: state.changeMainBarVisibleReducer.needHide
    }),
    (dispatch) => ({

        
    })
)(createAppContainer(AppNavigator));