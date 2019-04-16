import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ScreenUtil from "src/util/ScreenUtil";
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {connect} from "react-redux";
import {ChangeCityNameSearchVisibleAction} from 'src/redux/actions/ChangeCityNameSearchVisibleAction';
import HorizontalRule from "src/pages/common/ui/HorizontalRule";
import cities from "../../../res/json/city.json";
import PropTypes from 'prop-types';
import {SelectPlayingCityAction} from "src/redux/actions/SelectPlayingCityAction";

var pinyin = require("pinyin");

//点击搜索框弹出
class SearchCityPop1 extends React.Component {

    static propTypes = {
        allCities: PropTypes.array,

        goBackToMain: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            cityNames: [],
            hasSearchContent: false
        };

        this.clickGreyBgHandler = this.clickGreyBgHandler.bind(this);
        this.getContent = this.getContent.bind(this);
        this.onTextInputChange = this.onTextInputChange.bind(this);
        this.searchCityByInput = this.searchCityByInput.bind(this);
        this.goTargetCity = this.goTargetCity.bind(this);

        let $allCities = [];

        let config = cities.provinces;

        for (let i = 0; i < config.length; i++) {
            $allCities = $allCities.concat(config[i].citys)
        }

        //排序
        $allCities.sort( function compareFunction(param1, param2) {
            return pinyin.compare(param1.citysName, param2.citysName)
        });

        this.allCities = $allCities;
    }

    componentDidMount() {

        let input = this.refs["myInput"];

        input.focus();
    }

    clickGreyBgHandler() {
        const {changeSearchCityPop} = this.props;

        changeSearchCityPop(false);
    }


    render() {

        return <View
            style={{position: 'absolute', width: '100%', height: '100%'}}>

            <View style={{backgroundColor: '#ffffff',height: ScreenUtil.scale(65), direction: 'row', justifyContent: 'center'}}>

                <Input placeholder='输入城市名称查询'
                       leftIcon={
                           <AweIcon
                               name='search'
                               size={ScreenUtil.scale(16)}
                               color='#9b9b9b'
                           />
                       }

                       inputStyle={{
                           fontSize: ScreenUtil.scale(16),
                           color: '#9b9b9b',
                           marginTop: ScreenUtil.scale(3),
                           marginLeft: ScreenUtil.scale(10)
                       }}

                       inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}

                       containerStyle={{
                           height: ScreenUtil.scale(40),
                           alignItems: 'center',
                           // marginTop: ScreenUtil.scale(7)
                       }}

                       autoCorrect={false}

                       autoFocus={true}
                       returnKeyLabel={'搜索'}
                       returnKeyType={'search'}
                       ref='myInput'
                       onChange={this.onTextInputChange}
                />


            </View>

            {this.getContent()}

        </View>
    }

    onTextInputChange(e) {
        this.setState({hasSearchContent: e.nativeEvent.text.length > 0});

        this.searchCityByInput(e.nativeEvent.text);

        // let list =  this.ref["cityList"];
    }

    getContent() {
        let input = this.refs["myInput"];

        if (this.state.hasSearchContent)
        {
            return       <FlatList
                style={{paddingLeft: ScreenUtil.scale(10), paddingRight: ScreenUtil.scale(10), backgroundColor: '#FFFFFF'}}
                data={this.state.cityNames}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    this.renderItemHandler4(item)
                )}

                ref={'cityList'}
                ItemSeparatorComponent={this.renderSeparator}
            />
        }
        else {
            return <TouchableOpacity onPress={this.clickGreyBgHandler}>
                <View style={{width: '100%', height: '100%', backgroundColor: '#cfcfcf', opacity: 0.5}}>

                </View>
            </TouchableOpacity>
        }


    }

    goTargetCity(cityName) {
        const {reduxChangeCity, goBackToMain, changeSearchCityPop} = this.props;

        reduxChangeCity(cityName);

        changeSearchCityPop(false);

        goBackToMain();
    }

    renderItemHandler4(item) {
        return <TouchableOpacity onPress={() => {this.goTargetCity(item)}}>
            <View style={{justifyContent: 'center', height: ScreenUtil.scale(50)}}><Text
                style={{color: '#000000', fontSize: 18, left: ScreenUtil.scale(20)}}>{item}</Text></View>
        </TouchableOpacity>

    }

    renderSeparator() {
        return <HorizontalRule/>;
    }

    searchCityByInput(inputText) {
        // inputText = "州";
        let ret = [];

        for (let i = 0; i < this.allCities.length; i++) {
            if (this.allCities[i].citysName.indexOf(inputText) >= 0) {

                console.log(this.allCities[i].citysName);
                ret.push(this.allCities[i].citysName);
            }
        }

        this.setState({cityNames: ret});
    }
}

const mapStateToProps = (state) => {
    return { showPop1: state.selectPlayingCityReducer.showSearchCityPop};
};

const mapDispatchToProps = (dispatch) => {
    return {changeSearchCityPop: (value)=> dispatch(ChangeCityNameSearchVisibleAction(value)),
            reduxChangeCity: (cityName) => dispatch(SelectPlayingCityAction(cityName)),};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCityPop1);