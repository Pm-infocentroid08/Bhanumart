//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity ,Image} from 'react-native';
import {COLORS,FONTS,SIZES} from '../../constants/index'
import {Ionicons} from 'react-native-vector-icons'

// create a component
const OrderList = (props,{navigation}) => {
    const {item} = props;
    return (
        <View style={styles.container}>
            <View style={styles.heBox}>
                <View style={styles.imageBox}>
                    
                </View>
                <View>
                    <Text style={{...FONTS.h2,textTransform:'capitalize',color:COLORS.primary}}>{item.item.status}</Text>
                    <Text>On {item.item.date}</Text>
                </View>
            </View>
            <View style={styles.detaCont}>
                <Image
                    source={{uri:item.item.image}}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.teBox}>
                    <Text style={{...FONTS.h3,textTransform:'capitalize',color:COLORS.black}}>{item.item.name}</Text>
                    <Text style={{...FONTS.body3,textTransform:'capitalize',color:COLORS.primary}}>{item.item.price}</Text>
                    <Text style={{...FONTS.body3,textTransform:'capitalize',color:COLORS.primary}}>{item.item.brand}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Ionicons name='chevron-forward' size={SIZES.padding} color={COLORS.gray}/>
                </TouchableOpacity>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        backgroundColor:COLORS.lightGray,
        padding:10
    },
    heBox:{
        flexDirection:'row',
        paddingHorizontal:10,
    },
    imageBox:{
        width:SIZES.padding*2,
        height:SIZES.padding*2,
        borderRadius:SIZES.padding,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.black,
        marginRight:10
    },
    detaCont:{
        flex:1,
        flexDirection:'row',
        padding:10,
        backgroundColor:COLORS.white,
        marginVertical:5,
    },
    image:{
        width:100,
        height:100,
        borderRadius:SIZES.padding,
        marginRight:10
    },
    teBox:{
        flex:1,
        height:'100',
        justifyContent:'space-around',
        marginLeft:15,
        padding:10
    },
    icon:{
        width:50,
        justifyContent:'center',
        alignItems:'center'
    }
});

//make this component available to the app
export default OrderList;
