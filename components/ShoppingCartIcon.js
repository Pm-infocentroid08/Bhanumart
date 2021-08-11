import React, { useState ,useEffect} from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { FONTS } from '../constants'

function ShoppingCartIcon(props) {
  const {cartCount}=props;
  const navigation =useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.button}>
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cartCount}</Text>
      </View>
      <Ionicons name='ios-cart' size={20} color='#101010' />
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

export default ShoppingCartIcon