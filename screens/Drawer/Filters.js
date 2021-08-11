//import liraries
import React, { useState  } from 'react';
import { View, Text, StyleSheet ,TouchableOpacity,CheckBox} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
// create a component
const Bar=({title})=>{
    const [isSelected, setSelection] = useState(false);
    return(
        <View style={styles.barContainer}>
            <Text style={[styles.textB]}>{title}</Text>
            <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
                />
        </View>
    )
}
const Filters = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Filters' onPress={()=>navigation.goBack()}/> 
            <View style={{margin:10,padding:10,borderRadius:10}}>
                <Bar title='Popularity'/>
                <Bar title='Price-Low to High'/>
                <Bar title='Price-Hign to Low'/>
                <Bar title='5 OFF-Hign to Low '/>
            </View>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                padding:15,
                backgroundColor:COLORS.lightGray,
                position:'absolute',
                bottom:10,
                flex:1,
                width:'100%'
            }}>
                <Text style={{...FONTS.h3,color:COLORS.black,fontWeight:'bold'}}> 6 Items</Text>
                <TouchableOpacity style={{padding:10,backgroundColor:COLORS.black,borderRadius:8}}>
                    <Text style={{...FONTS.h3,color:COLORS.white,fontWeight:'bold'}}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:35,
        backgroundColor: COLORS.white,
    },
    barContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        backgroundColor:COLORS.lightGray,
        margin:2
    },
    textB:{
        fontWeight:'bold',
        fontSize:18,
        color:COLORS.black
    },
    checkbox: {
        alignSelf: "center",
      },
});

//make this component available to the app
export default Filters;
