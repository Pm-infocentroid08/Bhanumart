//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native';
import {FONTS,SIZES,COLORS,icons} from '../../constants/index'
import {useNavigation} from '@react-navigation/native'
import {Ionicons,FontAwesome} from 'react-native-vector-icons'
// create a component
const SampleProduct = (props) => {
    const {item} = props;
    const AddToCart=()=>{
        props.addItemToCart(item)
    }
    const navigation =useNavigation();
    return (
        <View>
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('ProductDetail',{item})}>
            <View style={styles.left}>
                <View style={[styles.imgBox,styles.shadow]}>
                    <Image
                    source={{uri:item.image}}
                    resizeMode='contain'
                        style={styles.image}
                    />
                    <View style={{position:'absolute',backgroundColor:COLORS.bgcolor,borderTopLeftRadius:SIZES.radius,borderBottomRightRadius:SIZES.radius,padding:5,paddingHorizontal:10}}>
                                    <Text style={{fontSize:14,fontWeight:'bold',color:COLORS.white,top:0}}>{item.offer}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{height:30,backgroundColor:COLORS.lightGray,justifyContent:'center',alignItems:'center',marginVertical:SIZES.base,borderRadius:SIZES.base}}>
                    <Text style={{fontWeight:'bold',color:COLORS.black}}>Today's Off {' '}
                        <Ionicons name='chevron-down' size={14} color={COLORS.black}/>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.right}>
                <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,paddingVertical:6}}>{item.name}</Text>
                <Text style={{padding:SIZES.base*0.6,backgroundColor:'#ffece6',width:60,borderRadius:SIZES.base,textAlign:'center'}}>{item.rating}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.black}/></Text>
                <Text style={{padding:4,height:30,backgroundColor:'rgba(0,0,0,0.05)',borderRadius:3,marginVertical:4,paddingLeft:12,fontWeight:'500'}}>{item.quant}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flexDirection:'row',padding:SIZES.base,alignItems:'center'}}>
                        <Text style={{paddingHorizontal:8,fontWeight:'bold',fontSize:16}}>
                            <FontAwesome name='rupee' color={COLORS.black} size={14}/>
                        {item.discountPrice}
                        </Text>
                        <Text style={{textDecorationLine:'line-through'}}>
                            <FontAwesome name='rupee' color={COLORS.black} size={14}/>
                            {item.price}
                        </Text>
                    </View>
                    <TouchableOpacity 
                    style={{width:40,height:40,
                        borderRadius:20,justifyContent:'center',
                        alignItems:'center',backgroundColor:COLORS.bgcolor,
                        marginRight:SIZES.base}}
                        onPress={AddToCart}
                    >
                        <Ionicons name='cart' color={COLORS.white} size={SIZES.padding}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
        <View style={styles.seperator}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        padding:5
    },
    left:{
        width:140,
        padding:10
    },
    imgBox:{
        width:120,
        height:90,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.white
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:SIZES.radius
    },
    right:{
        flex:1,
        padding:4
    },
    seperator:{
        width:'100%',
        height:1,
        backgroundColor:COLORS.bgcolor
    },
    shadow:{
        shadowColor:COLORS.black,
        shadowOffset:{
            width:0,
            height:6
        },
        shadowOpacity:0.35,
        shadowRadius:4.35,
        elevation:5
    }
});

//make this component available to the app
export default SampleProduct;
