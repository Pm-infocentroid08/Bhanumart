import React, { useState ,useEffect} from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { COLORS,FONTS } from './../constants/theme';

function WishlistIcon(props) {
  
  const navigation =useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Wish')}
      style={styles.button}>     
      <Ionicons name='heart-outline' size={23} color={COLORS.black} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10
  },
  itemCountContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#FF7D7D',
    right: 12,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  itemCountText: {
    color: 'white',
    fontWeight: 'bold',
    ...FONTS.h4
  }
})

export default WishlistIcon