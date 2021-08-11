//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
import {Fontisto,MaterialIcons} from 'react-native-vector-icons'


// create a component
const Wallet = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <HeaderBar titleText='Wallet' onPress={()=>navigation.goBack()} />
                <View style={styles.wConatiner}>
                    <View style={styles.iconBox }>
                        <Fontisto name='wallet' color={COLORS.black} size={SIZES.padding*1.5}/>
                    </View>
                    <View style={styles.texBox}>
                        <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,paddingVertical:4}}>Wallet Summary</Text>
                        <Text style={{...FONTS.body3,fontWeight:'600',color:COLORS.gray,paddingVertical:4}}>Current Balance Rs. 40</Text>
                    </View>
                </View>
                <View style={styles.seperator}/>
                <TouchableOpacity style={[styles.wConatiner,{backgroundColor:COLORS.white,margin:1}]} onPress={()=>navigation.navigate('AddMoney')}>
                    <View style={styles.iconBox }>
                        <MaterialIcons name='addchart' color={COLORS.black} size={SIZES.padding}/>
                    </View>
                    <View style={styles.texBox}>
                        <Text style={{...FONTS.body3,fontWeight:'bold',color:COLORS.black,paddingVertical:2}}>Add Money To Wallet</Text>
                    </View>
                    <View style={styles.iconBox }>
                        <MaterialIcons name='arrow-forward-ios' color={COLORS.black} size={SIZES.padding}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperator}/>
                <TouchableOpacity style={[styles.wConatiner,{backgroundColor:COLORS.white,margin:1}]} onPress={()=>navigation.navigate('Contact')}>
                    <View style={styles.iconBox }>
                        <MaterialIcons name='addchart' color={COLORS.black} size={SIZES.padding}/>
                    </View>
                    <View style={styles.texBox}>
                        <Text style={{...FONTS.body3,fontWeight:'bold',color:COLORS.black,paddingVertical:2}}>Report payment Issue</Text>
                    </View>
                    <View style={styles.iconBox }>
                        <MaterialIcons name='arrow-forward-ios' color={COLORS.black} size={SIZES.padding}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperator}/>
                <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,paddingVertical:12,paddingLeft:15}}>Recents </Text>
                <TouchableOpacity style={[styles.wConatiner]}>
                    <View style={styles.iconBox }>
                        <MaterialIcons name='add-task' color={COLORS.black} size={SIZES.padding}/>
                    </View>
                    <View style={styles.texBox}>
                        <Text style={{...FONTS.body3,fontWeight:'bold',color:COLORS.black,paddingVertical:2}}>Amount Added to Wallet</Text>
                        <Text style={{...FONTS.body3,fontWeight:'600',color:COLORS.gray,paddingVertical:2}}>12-04-2021</Text>
                    </View>
                    <View style={styles.iconBox }>
                        <Text style={{...FONTS.h3,fontWeight:'bold',color:COLORS.black,paddingVertical:2}}>Rs. 40</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.white,
        paddingTop:35
    },
    wConatiner:{
        flexDirection:'row',
        padding:10,
        backgroundColor:COLORS.lightGray,
        margin:10
    },
    iconBox:{
        marginLeft:15,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    texBox:{
        flex:1,
        paddingLeft:SIZES.padding
    },
    seperator:{
        height:1,
        backgroundColor:COLORS.gray
    }
});

//make this component available to the app
export default Wallet;
