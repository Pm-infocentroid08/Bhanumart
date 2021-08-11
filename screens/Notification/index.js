//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { COLORS } from './../../constants/theme';
import HeaderBar from './../../components/HeaderBar/index';
// create a component
const Notification = ({navigation}) => {
    return (
        <View style={styles.container}>
        
            <Image
                source={{uri:'https://i.dlpng.com/static/png/6326044_preview.png'}}
                style={{width:200,height:200}}
            />
            <Text style={{fontWeight:'bold',color:COLORS.bgcolor,fontSize:22,paddingVertical:10}}>No Notification yet...!</Text>
            <Text style={{fontWeight:'bold',color:COLORS.gray,fontSize:16,paddingVertical:10}}>We'll Notify you when something arrives.</Text>
            <View style={{justifyContent:'center',height:150,width:'100%'}}>
                <TouchableOpacity style={{height:40,marginHorizontal:60,backgroundColor:COLORS.bgcolor,
                justifyContent:'center',alignItems:'center',borderRadius:20}}
                onPress={() => navigation.navigate('Home')}>
                    <Text style={{color:COLORS.white,fontWeight:'bold'}}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});

//make this component available to the app
export default Notification;
