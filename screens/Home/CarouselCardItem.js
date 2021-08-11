import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from "react-native"
import { COLORS } from './../../constants/theme';

export const SLIDER_WIDTH = Dimensions.get('window').width -10
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH )

const CarouselCardItem = ({ item, index }) => {
  
  return (
    <View style={styles.container} key={index}>
    <TouchableOpacity style={styles.container} >
    <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode='cover'
      />
    </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: ITEM_WIDTH,
    height:Dimensions.get('window').height * 0.25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height:'100%'
  },
  
})

export default CarouselCardItem