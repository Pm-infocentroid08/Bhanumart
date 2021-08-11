//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,FlatList,Image} from 'react-native';
import { COLORS ,SIZES,FONTS} from '../../constants';
import HeaderBar from './../../components/HeaderBar/index';
import offers from './../../Data/Offers';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {FontAwesome,Ionicons} from 'react-native-vector-icons'
import {useNavigation} from '@react-navigation/native' 
import SampleProduct from './../../components/Product/SampleProduct';
// create a component
const Product=(props)=>{
    const {item} = props;
    const navigation =useNavigation();
    return(
        <TouchableOpacity style={{flex:1,width:SIZES.width*0.45,backgroundColor:COLORS.white,borderRadius:SIZES.radius,padding:SIZES.base,margin:5,borderWidth:1}} onPress={()=>navigation.navigate('ProductDetail',{item})}>
                <View style={[{height:SIZES.height*0.18,borderRadius:SIZES.base,backgroundColor:COLORS.white,marginHorizontal:10},styles.boXShadow]}>
                    <Image
                    resizeMode='cover'
                        source={{uri:item.image}}
                        style={{width:'100%',height:'100%',borderRadius:SIZES.base}}
                    />
                    <View style={{position:'absolute',top:0,backgroundColor:COLORS.bgcolor,padding:5,borderTopLeftRadius:SIZES.base,borderBottomRightRadius:SIZES.base,paddingHorizontal:10}}>
                        <Text style={{color:COLORS.white,...FONTS.h4,fontWeight:'bold'}}>{item.offer}</Text>
                    </View>
                </View>
                <Text style={{...FONTS.h3,fontWeight:'bold',paddingVertical:SIZES.base,paddingHorizontal:SIZES.base}}>{item.name}</Text>
                <Text style={{padding:4,backgroundColor:'#ffece6',width:60,borderRadius:SIZES.padding*0.5,textAlign:'center'}}>{item.rating}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.black}/></Text>
                <Text style={{padding:4,flex:1,backgroundColor:'rgba(0,0,0,0.05)',borderRadius:3,marginVertical:4,paddingLeft:12,fontWeight:'500'}}>{item.quant}</Text>
                <View style={{flexDirection:'row',padding:SIZES.base,alignItems:'center'}}>
                    <Text style={{paddingHorizontal:8,fontWeight:'bold',...FONTS.h3}}>
                        <FontAwesome name='rupee' color={COLORS.black} size={14}/>
                       {item.discountPrice}
                    </Text>
                    <Text style={{textDecorationLine:'line-through'}}>
                        <FontAwesome name='rupee' color={COLORS.black} size={14}/>
                        {item.price}
                    </Text>
                </View>
                <TouchableOpacity style={{flex:1,height:30,borderRadius:SIZES.radius,justifyContent:'center',alignItems:'center',backgroundColor:COLORS.bgcolor}}
                onPress={()=>{}}>
                    <Text style={{fontWeight:'bold',color:COLORS.white,...FONTS.h3}}>Add</Text>
                </TouchableOpacity>
            </TouchableOpacity>
    )
}
const Offers = ({navigation}) => {
    function renderHeader(){
        return(
        <View style={styles.container}>
            <HeaderBar titleText='Offers' onPress={()=>navigation.goBack()}/>
            <View style={[styles.flexContainer,{marginHorizontal:0}]}>
                    
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        index={2}
                        showPagination
                        data={offers.flexData}
                        renderItem={({ item }) => (
                            <View style={[styles.child, { backgroundColor: item }]}>
                            <Image
                                source={{uri:item.image}}
                                resizeMode='contain'
                                style={{
                                    width:'100%',
                                    height:'100%'
                                }}
                            />
                            </View>
                            )}
                        />
                </View>
                <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,
                backgroundColor:COLORS.lightGray,padding:10,margin:10}}>Top Offers on Fruits and  Vegitables</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex:1,paddingVertical:8,paddingHorizontal:5}}>
                    <FlatList
                            data={offers.Vegi}
                            keyExtractor={item=>`${item.id}`}
                            renderItem={({item}) => <Product item={item} />}                        
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        <TouchableOpacity style={{flex:1,width:SIZES.width*0.3,
                        backgroundColor:COLORS.white,borderRadius:SIZES.radius,
                        padding:SIZES.base,marginHorizontal:10,margin:5,borderWidth:1,justifyContent:'center',
                        alignItems:'center'}}
                        onPress={()=>navigation.navigate('ProdList')}>
                            <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.bgcolor}}>View All</Text>
                        </TouchableOpacity>
                </ScrollView>
                <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,
                backgroundColor:COLORS.lightGray,padding:10,margin:10}}>Top Offers on Food Grains & Oil</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex:1,paddingVertical:8,paddingHorizontal:5}}>
                    <FlatList
                            data={offers.aata}
                            keyExtractor={item=>`${item.id}`}
                            renderItem={({item}) => <Product item={item} />}                        
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                        <TouchableOpacity style={{flex:1,width:SIZES.width*0.3,
                        backgroundColor:COLORS.white,borderRadius:SIZES.radius,
                        padding:SIZES.base,marginHorizontal:10,margin:5,borderWidth:1,justifyContent:'center',
                        alignItems:'center'}}
                        onPress={()=>navigation.navigate('ProdList')}>
                            <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.bgcolor}}>View All</Text>
                        </TouchableOpacity>
                </ScrollView>
                <SwiperFlatList autoplay autoplayDelay={10} autoplayLoop index={2} showPagination>
                <View style={{width:SIZES.width,height:SIZES.height*0.2}}>
                    <Image
                        source={{uri:'http://www.tippingpointtavern.com/wp-content/uploads/2020/02/promotions-jpg.jpeg'}}
                        resizeMode='contain'
                        style={{
                            width:'100%',
                            height:'100%'
                        }}
                    />
                </View>
                <View style={{width:SIZES.width,height:SIZES.height*0.2}}>
                    <Image
                        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSssi_mHSIP8LJ4lnkPmy0X56YjIkoUqbTcRd1V0lJimm4ESzFrgFIcVc4vTbNTPc4Ev4I&usqp=CAU'}}
                        resizeMode='contain'
                        style={{
                            width:'100%',
                            height:'100%'
                        }}
                    />
                </View>
                <View style={{width:SIZES.width,height:SIZES.height*0.2}}>
                    <Image
                        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-P5_mOKf77Dr7ohpOpwDar8L35PSVXSAn1g0-V8OHQK1Az2d0TbFbCw_gPaxcR4zahhc&usqp=CAU'}}
                        resizeMode='contain'
                        style={{
                            width:'100%',
                            height:'100%'
                        }}
                    />
                </View>
                </SwiperFlatList>

                <Text style={{...FONTS.h2,fontWeight:'bold',color:COLORS.black,
                backgroundColor:COLORS.lightGray,padding:10,margin:10}}>Mega Offers Deals</Text>
                <View style={{marginBottom:50,margin:SIZES.base}}>
                            <FlatList
                                data={offers.Vegi}
                                keyExtractor={item=>`${item.id}`}
                               renderItem={({item,index})=>(
                                <SampleProduct item={item} key={index} />
                               )}
                            />
                            <TouchableOpacity 
                            style={{
                                height:40,justifyContent:'center',
                                alignItems:'center',flexDirection:'row',
                                marginVertical:5,backgroundColor:COLORS.lightGray
                                }}
                                onPress={()=>navigation.navigate('ProdList')}>
                                    <Text style={{...FONTS.h3,fontWeight:'bold',paddingRight:SIZES.base}}>View All</Text>
                                    <Ionicons name='arrow-forward' color={COLORS.bgcolor} size={SIZES.padding}/>
                            </TouchableOpacity>
                </View>
        </View> 
        )
    }
    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:25,
        backgroundColor: COLORS.white,
    },
    flexContainer:{
        flex:1,
        height:SIZES.height*0.2,
        marginVertical:8,
        borderRadius:SIZES.base,
        margin:5
    },
    child: {
        width:SIZES.width,
         justifyContent: 'center' 
       },
       boXShadow:{
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
export default Offers;
