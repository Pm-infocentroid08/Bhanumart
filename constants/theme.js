import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { useFonts } from 'expo-font';
export const COLORS = {
    // base colors
    primary: "#5390ff", // Blue
    secondary: "#cacfd9",   // Gray
    bgcolor:'#ff4d4d',
    catBack:'#bfbfbf',
    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#eff2f5",
    gray: "#8b9097",
    darkgray:'#181818',
    lgray:'#b6b6b6',

};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 16,
    h2: 14,
    h3: 12,
    h4: 10,
    body1: 16,
    body2: 14,
    body3: 12,
    body4: 10,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55},
    h1: {  fontSize: SIZES.h1, lineHeight: 36},
    h2: {  fontSize: SIZES.h2, lineHeight: 30 },
    h3: {fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontSize: SIZES.body1, lineHeight: 36},
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: {fontSize: SIZES.body3, lineHeight: 22},
    body4: {  fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
