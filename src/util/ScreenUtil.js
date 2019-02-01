var React = require('react-native')

var PixelRatio = React.PixelRatio;

const screenWidth = React.Dimensions.get('window').width;

const screenHeight = React.Dimensions.get('window').height;

const fontScale = PixelRatio.getFontScale();

const w = PixelRatio.getPixelSizeForLayoutSize(screenWidth);

const h = PixelRatio.getPixelSizeForLayoutSize(screenHeight);

const DEFAULT_WIDTH = 411;

const DEFAULT_HEIGHT = 683;

const MIN_SCALE = Math.min(screenHeight/DEFAULT_HEIGHT, screenWidth/DEFAULT_WIDTH);

export default class ScreenUtil {

    static getScreenWidth() {
        return screenWidth;
    }

    static getScreenHeight() {
        return screenHeight;
    }

    static scale(value) {
        return MIN_SCALE*value;
    }

}