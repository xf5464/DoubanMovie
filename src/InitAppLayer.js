import React from 'react';
import {Keyboard} from 'react-native';
import {connect} from "react-redux";
import StartApp from "src/StartApp";
import {ChangeMainBarVisibleAction} from "src/redux/actions/ChangeMainBarVisibleAction";

//这个类的作用主要是写一些全局的操作，不知道在StartApp跟Root中要怎么写这个
class InitAppLayer extends React.Component {


    componentDidMount() {
        this.keyBoardShowListener = Keyboard.addListener('keyboardDidShow', this.keyBoardShowHandler.bind(this));

        this.keyBoardHideListener = Keyboard.addListener('keyboardDidHide', this.keyBoardHideHandler.bind(this));
    }

    componentWillUnmount() {

        // if (this.keyBoardShowListener != null) {
        //     this.keyBoardShowListener.remove();
        // }
        //
        // if (this.keyBoardHideListener != null) {
        //     this.keyBoardHideListener.remove();
        // }
    }


    keyBoardShowHandler() {
        // console.log('key border show');

        const {hideBottomBarHandler} = this.props;

        hideBottomBarHandler(true);
    }

    keyBoardHideHandler() {
        // console.log('key border hide');

        const {hideBottomBarHandler} = this.props;

        hideBottomBarHandler(false);
    }

    render() {
        return <StartApp/>
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {hideBottomBarHandler: (visible)=> dispatch(ChangeMainBarVisibleAction(visible))};
};

export default connect(mapStateToProps, mapDispatchToProps)(InitAppLayer);