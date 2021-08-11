//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,ImageBackground,TouchableOpacity,Image,ScrollView} from 'react-native';
import { COLORS, SIZES ,FONTS} from '../../constants';
import {Ionicons,MaterialCommunityIcons} from 'react-native-vector-icons'
import Button from '../../components/Container/Button';


// create a component
const HeaderBar=({titleText,...rest})=>{
    return(
        <View style={styles.hcontainer}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}> 
                <TouchableOpacity style={styles.hbuttonContainer} {...rest}>
                    <Ionicons name='chevron-back' color={COLORS.black} size={SIZES.h1}/>
                </TouchableOpacity>
                <Text style={{...FONTS.h3,marginHorizontal:20,color:COLORS.white}}>{titleText}</Text>
            </View>
        </View>
    )
}
const MemberShip = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <ImageBackground
            source={{uri:'https://www.creative-asset.co.uk/wp-content/uploads/2017/10/cabackground-blue.jpg'}}
            style={{width:SIZES.width,height:'100%'}}>
               
                <HeaderBar titleText='Golden membership' onPress={()=>navigation.goBack()}/>
                <View style={{width:SIZES.width,
                        height:SIZES.height*0.3,justifyContent:'center',alignItems:'center'}}>
                    <Image
                    source={require('../../assets/images/Logo.png')}
                    resizeMode='contain'
                    style={{
                        width:'50%',
                        height:'100%',
                        borderRadius:SIZES.height*0.15
                    }}
                    />
                </View>
                <Text style={{...FONTS.h1,fontWeight:'bold',color:COLORS.white,paddingVertical:6,textAlign:'center',textTransform:'uppercase',letterSpacing:2}}>BHANU MART</Text>
                <View style={{padding:10,backgroundColor:'rgba(0,0,0,0.35)',borderRadius:SIZES.base,margin:15}}>
                    <Text style={{...FONTS.h2,color:COLORS.white,textAlign:'center',paddingVertical:4}}>Join at a special price of just</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{...FONTS.h3,color:COLORS.white,paddingVertical:4,paddingRight:10,textDecorationLine:'line-through'}}>Rs.499</Text>
                        <Text style={{...FONTS.h3,color:COLORS.white,paddingVertical:4}}>Rs.249 / 6 months</Text>
                    </View>
                </View>
                <View style={{padding:10,backgroundColor:'rgba(0,0,0,0.35)',borderRadius:SIZES.base,margin:15}}>
                    <Text style={{...FONTS.h2,color:COLORS.white,textAlign:'center',paddingVertical:4}}>Join at a special price of just</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{...FONTS.h3,color:COLORS.white,paddingVertical:4,paddingRight:10,textDecorationLine:'line-through'}}>Rs.299</Text>
                        <Text style={{...FONTS.h3,color:COLORS.white,paddingVertical:4}}>Rs.149 / 3 months</Text>
                    </View>
                </View>
                <View style={{margin:15,padding:10,backgroundColor:COLORS.white,borderRadius:SIZES.radius}}>
                    <View style={styles.oBox}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name='car-estate' color={COLORS.black} size={SIZES.padding*2}/>
                        </View>
                        <View style={{paddingLeft:SIZES.padding*2,flex:1}}>
                            <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.bgcolor,paddingVertical:4}}>Free Delivery</Text>
                            <Text style={{...FONTS.body3,fontWeight:'800',color:COLORS.gray,paddingVertical:4}}>On order above Rs. 500</Text>
                        </View>
                    </View>
                    <View style={styles.oBox}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name='currency-usd-circle-outline' color={COLORS.black} size={SIZES.padding*2}/>
                        </View>
                        <View style={{paddingLeft:SIZES.padding*2,flex:1}}>
                            <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.bgcolor,paddingVertical:4}}>Rs. 299 Cashback</Text>
                            <Text style={{...FONTS.body3,fontWeight:'800',color:COLORS.gray,paddingVertical:4}}>Rs. 100 cashback on very first order.</Text>
                        </View>
                    </View>
                    <View style={styles.oBox}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name='wallet-membership' color={COLORS.black} size={SIZES.padding*2}/>
                        </View>
                        <View style={{paddingLeft:SIZES.padding*2,flex:1}}>
                            <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.bgcolor,paddingVertical:4}}>Access To Priority Slot</Text>
                            <Text style={{...FONTS.body3,fontWeight:'800',color:COLORS.gray,paddingVertical:4}}>Member always get first preference</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom:50}}>
                    <Button bText='Join Now'/>
                </View>
            </ImageBackground>
            
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       paddingTop:35,
        backgroundColor: COLORS.white,
    },
    hcontainer: {
        
        flexDirection:'row',
        height:60,
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10,
        width:'100%',
        paddingHorizontal:10
    },
    hbuttonContainer:{
        width:SIZES.padding*1.5,
        height:SIZES.padding*1.4,
        borderRadius:SIZES.radius,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.34)',
        marginRight:10
    },
    oBox:{
        flexDirection:'row',
        padding:10
    },
    iconBox:{
        width:50,
        justifyContent:'center',
        alignItems:'center'
    }
});

//make this component available to the app
export default MemberShip;
