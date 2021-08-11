//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import {MaterialIcons,FontAwesome} from 'react-native-vector-icons'
import {FONTS,COLORS,SIZES} from '../../constants/index'

// create a component
const CartItem = (props,{...rest}) => {
    const [quant,setQuant]=useState(1);
    const {item} = props;
    return (
        <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri:item.image}}
                        style={styles.iamge}
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={{justifyContent:'space-between',height:60,paddingVertical:10}}>
                        <Text style={{...FONTS.h3}}>{item.name}</Text>
                        <Text style={{...FONTS.body3}}>
                            <FontAwesome name='rupee' color={COLORS.black} size={14}/>
                            {' '}
                            {item.price}
                        </Text>
                        <View style={styles.conuterBox}>
                            <TouchableOpacity style={styles.cBox} onPress={()=>{setQuant(quant -1)}}>
                                <Text style={styles.textS}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.textS}>{quant}</Text>
                            <TouchableOpacity style={styles.cBox} onPress={()=>{setQuant(quant+1)}}>
                                <Text style={styles.textS}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.icon}>
                            <MaterialIcons name='delete' color='tomato' size={20}/>
                    </TouchableOpacity>
                </View>
            </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    listContainer:{
        flex:1,
        margin:10,
        borderRadius:15,
        backgroundColor:COLORS.white,
        padding:10,
        flexDirection:'row'
    },
    imageContainer:{
        width:120,
        height:100,
        borderRadius:15
    },
    iamge:{
        width:'100%',
        height:'100%',
        borderRadius:15
    },
    textContainer:{
        flex:1,
        marginLeft:15,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    icon:{
        width:40,
        height:40,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(249, 231, 159 ,0.35)'
    },
    conuterBox:{
        width:'60%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10
    },
    cBox:{
        width:20,
        height:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(249, 231, 159 ,0.35)'
    },
    textS:{
        fontWeight:'bold'
    }
});

//make this component available to the app
export default CartItem;
