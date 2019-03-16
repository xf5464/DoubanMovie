import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import HorizontalRule from 'src/pages/common/ui/HorizontalRule';
import ScreenUtil from "src/util/ScreenUtil";
import AweIcon from 'react-native-vector-icons/FontAwesome';
import * as StackNavigatorName from "src/constant/StackNavigatorName";
import {SelectPlayingCityAction} from "src/redux/actions/SelectPlayingCityAction";
import {ChangeMainBarVisibleAction} from "src/redux/actions/ChangeMainBarVisibleAction";
import {connect} from "react-redux";

class ChinaCity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataList: []
        }

        this.goCity = this.goCity.bind(this);
    }

    goCity(cityName) {
        const {hideBottomBarHandler} = this.props;

        hideBottomBarHandler(false);

        const {changeCityNameHandler} = this.props;

        changeCityNameHandler(cityName);

        this.props.navigation.navigate(StackNavigatorName.FIND_MAIN_TAB);
    }

    renderItemHandler(item) {
        return <TouchableOpacity onPress={() => {this.goCity(item)}}>
            <View style={{justifyContent: 'center', height: ScreenUtil.scale(50)}}><Text
                style={{color: '#000000', fontSize: 18, left: ScreenUtil.scale(20)}}>{item}</Text></View>
        </TouchableOpacity>

    }

    renderSeparator() {
        return <HorizontalRule/>;
    }

    _goBack() {
        this.props.navigation.navigate('SEARCH_CITY_MAIN_TAB');
    }

    render() {
        return <View>

            <View style={{width: '100%', height: ScreenUtil.scale(50)}}>

                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: ScreenUtil.scale(20)
                    }}>{this.props.navigation.state.params.provinceName}</Text>
                </View>

                <TouchableOpacity style={{
                    width: ScreenUtil.scale(150)
                }} onPress={() => {
                    this._goBack()
                }}>
                    <View style={{
                        flexDirection: 'row', height: '100%', alignItems: 'center',
                        width: '100%',
                        // position: 'absolute', left: 0
                    }}>
                        <AweIcon name={'chevron-left'} color={'#42bd56'} size={ScreenUtil.scale(26)}
                                 style={{marginLeft: ScreenUtil.scale(20)}}/>
                    </View>

                </TouchableOpacity>
            </View>

            <HorizontalRule/>

            <FlatList
                style={{paddingLeft: 0, paddingRight: 0}}
                data={this.props.navigation.state.params.dataList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    this.renderItemHandler(item.citysName)
                )}
                ItemSeparatorComponent={this.renderSeparator}
            />
        </View>

    }
}

const mapStateToProps = (state) => {
    return { cityName: state.selectPlayingCityReducer.cityName};
};

const mapDispatchToProps = (dispatch) => {
    return {hideBottomBarHandler: ()=> dispatch(ChangeMainBarVisibleAction(true)),
        changeCityNameHandler: (cityName) => dispatch(SelectPlayingCityAction(cityName))};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChinaCity);