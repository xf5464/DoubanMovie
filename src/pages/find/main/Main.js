import React from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert} from 'react-native';
import AweIcon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import ScreenUtil from 'utils/ScreenUtil';

export default class Main extends React.Component {

    goToSelectCity() {
        Alert.alert('切换城市选择');
    }

    render() {
        return <View>
            <View style={{marginLeft: '2%', marginRight: '2%', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <TouchableOpacity style={styles.View1} onPress={this.goToSelectCity.bind(this)}>
                    <Text style={{color: '#494949', fontSize: ScreenUtil.scale(16)}}>杭州</Text>
                    <AweIcon name={'chevron-down'} color={'#494949'} style={{marginLeft: ScreenUtil.scale(5)}}/>
                </TouchableOpacity>

                <Input
                    placeholder='电影/电视剧/影人'
                    leftIcon={
                        <AweIcon
                            name='search'
                            size={ScreenUtil.scale(16)}
                            color='#9b9b9b'
                        />
                    }

                    inputStyle={{fontSize: ScreenUtil.scale(16), color: '#9b9b9b', marginTop: ScreenUtil.scale(3),}}
                    inputContainerStyle={{borderBottomWidth: 0, height: '100%'}}

                    containerStyle={{backgroundColor: '#f5f5f5', height: ScreenUtil.scale(40), alignItems: 'center'}}

                    autoCorrect={false}
                />
            </View>

        </View>
    }
}

const styles = StyleSheet.create({
    View1: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
