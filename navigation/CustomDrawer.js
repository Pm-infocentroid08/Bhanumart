import React, { useState,useEffect } from 'react';
import {View, Text, Alert, StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Entypo,MaterialIcons,MaterialCommunityIcons,Feather,Ionicons,Fontisto,Octicons} from 'react-native-vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS,FONTS } from './../constants/theme';
import data from './../Data/Category';

const CustomSidebarMenu = (props) => {
  
  return (
    <ScrollView style={stylesSidebar.sideMenuContainer}>
      
      <View style={stylesSidebar.flo}>
                                <Text style={stylesSidebar.h2}>Profile</Text>
                                <TouchableOpacity onPress={()=>{props.navigation.navigate('Profile')}}>
                                    <Ionicons name='chevron-forward' size={20} color={COLORS.black}/>
                                </TouchableOpacity>
                </View>
      <View style={stylesSidebar.profileHeaderLine} />
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('Home')}}> 
                    <Ionicons name='home' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.h3,marginLeft:15}}>Home</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      
      <TouchableOpacity style={stylesSidebar.list}
                            onPress={()=>{props.navigation.navigate('Orders')}}>
                            <Octicons name='checklist' size={16} color={COLORS.black}/>
                                <Text style={{...FONTS.h3,marginLeft:15}}>My Orders</Text>
      </TouchableOpacity>
      
        <View style={stylesSidebar.profileHeaderLine} />
       
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('Category')}}> 
      <Ionicons name='apps' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.h3,marginLeft:15}}>Shop by Category</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      
      
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('Contact')}}> 
      <MaterialIcons name='support-agent' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.body3,marginLeft:15}}>Customer Care</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('Notification')}}> 
      <MaterialIcons name='notifications-on' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.body3,marginLeft:15}}>Notification</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('CustomerCare')}}> 
      <MaterialIcons name='message' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.body3,marginLeft:15}}>FAQs</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('CanPol')}}> 
      <MaterialIcons name='cancel-presentation' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.body3,marginLeft:15}}>Cancelation Policy</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      <TouchableOpacity style={stylesSidebar.list} onPress={()=>{props.navigation.navigate('Privacy')}}> 
      <MaterialIcons name='privacy-tip' size={16} color={COLORS.black}/>
                    <Text style={{...FONTS.body3,marginLeft:15}}>Privacy & Policy</Text>
      </TouchableOpacity>
      <View style={stylesSidebar.profileHeaderLine} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="exit-to-app" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Logout"
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </ScrollView>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: '100%',
    height: '100%',
    borderRadius: 60 / 2,
  },
  profileHeaderText: {
    color: COLORS.gray,
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  flo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:6
},
list:{
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center',
  paddingHorizontal:20,
  paddingVertical:10
},
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});