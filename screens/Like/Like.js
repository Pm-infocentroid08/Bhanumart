//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Image, ImageBackground,FlatList, ToastAndroid } from 'react-native';
import { FONTS, COLORS, SIZES, images } from '../../constants/index'
import { Ionicons, FontAwesome } from 'react-native-vector-icons'
import HeaderBar from './../../components/HeaderBar/index';
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import Button from '../../components/Container/Button';
import { showMessage } from "react-native-flash-message";

import ShoppingCartIcon from '../../components/ShoppingCartIcon';
const Like = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [wish, setWish] = useState([]);
  const [cartCount,setCartCount]=useState(0);
  const userInfo = useSelector(state => state.users);
  
  const isFocused = useIsFocused();
  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const getCartProduct = () => {
    const myHeaderscar = new Headers();
    
    
    const formdatacar = new FormData();
    formdatacar.append("user_id", userInfo);
    
    const requestOptionscar = {
      method: 'POST',
      headers: myHeaderscar,
      body: formdatacar,
      redirect: 'follow'
    };
    
    fetch("https://bhanumart.vitsol.in/api/get_cart_detail", requestOptionscar)
    .then(response => response.json())
    .then((responseJson) => {
        if (responseJson.responce === true) {
            setCartCount(responseJson.data.length)             
        } else {
            setCartCount(0)
        }
    })
    .catch((error) => console.error(error));
}
  const getWishlist = () => {
    const myHeadersw = new Headers();
    const formdataw = new FormData();
    formdataw.append("user_id", userInfo);

    const requestOptionsw = {
      method: 'POST',
      headers: myHeadersw,
      body: formdataw,
      redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/get_wishlist_detail", requestOptionsw)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          setWish(result.data)
        } else {
          setWish(0)
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));

  }
  const add_cart = (item) => {
   
    const myHeadersadd = new Headers();
    const formdataadd = new FormData();
    formdataadd.append("user_id", userInfo);
    formdataadd.append("product_id", item.product_id);
    formdataadd.append("product_name", item.product_name);
    formdataadd.append("price", item.sale_price);
    formdataadd.append("qty", '1');
    formdataadd.append("variant_id", item.variant_id);


    const requestOptionsadd = {
      method: 'POST',
      headers: myHeadersadd,
      body: formdataadd,
      redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/add_to_cart", requestOptionsadd)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.responce === true) {
          removeWish(item.id);
          getCartProduct()
        } else {
          setErrortext(responseJson.massage);
          Alert.alert(responseJson.massage);
        }
      })
      .catch(error => console.log('error', error));
  }
  const removeWish = (id) => {
    const myHeadersrw = new Headers();
    const formdatarw = new FormData();
    formdatarw.append("wishlist_id", id);

    const requestOptionsrw = {
      method: 'POST',
      headers: myHeadersrw,
      body: formdatarw,
      redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/remove_wishlist_item", requestOptionsrw)
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.responce === true) {
          getWishlist();
          showToastWithGravity('Added to Cart');
          showMessage({
            message: responseJson.massage,
            type: "success",
          });

        } else {
          setErrortext(responseJson.massage);
          Alert.alert(responseJson.massage);
        }
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {

    getWishlist();
    getCartProduct();
  }, [isFocused])
  
  function renderWish() {
    const renderItem = ({ item }) => (
      <View key={item.id}>
        <View style={styles.containerbo} >
          <View style={styles.left}>
            <View style={[styles.imgBox, styles.shadow]}>
              
              {
                                item.stock_status === '0' ?
                                    <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={[styles.image]}>
                                        <View style={styles.text}>
                                        <Text style={{fontWeight:'bold',color:COLORS.white,textAlign:'center',transform: [{ rotate: '315deg' }],fontSize:16}}>Out of Stock</Text>
                                        </View>
                                    </ImageBackground> : <Image
                                        source={{ uri: item.image }}
                                        resizeMode='contain'
                                        style={styles.image}
                                        
                                    />}
                                   
            </View>
          </View>
          <View style={styles.right}>
            <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black, paddingTop: 12 }}>{item.product_name}</Text>
            {
              item.rating ? <Text style={{ padding: SIZES.base * 0.06, backgroundColor: '#ffece6', width: 40, borderRadius: SIZES.base, textAlign: 'center', fontSize: 12, color: COLORS.bgcolor }}>{item.rating || 0}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.bgcolor} /></Text> : <View />
            }

            <Text style={{ padding: 4, height: 30, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, marginVertical: 4, paddingLeft: 12, fontWeight: '500' }}>{item.varients.size}</Text>
            <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center' }}>
              <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                <FontAwesome name='rupee' color={COLORS.black} size={12} />
                {item.varients.sale_price}
              </Text>
              <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                <FontAwesome name='rupee' color='#808080' size={10} />
                {item.varients.product_price}
              </Text>
              {
                (Number(item.varients.discount)) < 1 ? <View /> :
                  <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{item.varients.discount}% OFF </Text>
                  </View>
              }

            </View>


            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            {
                                        
                                        item.stock_status === '0' ? <Text style={styles.ostock}>Out of Stock</Text>:
              <TouchableOpacity
                style={{
                  height: 30,
                  borderRadius: 10, justifyContent: 'center',
                  alignItems: 'center', backgroundColor: COLORS.bgcolor,
                  marginRight: SIZES.base,
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  add_cart(item)
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Add To Cart</Text>
              </TouchableOpacity>}
            </View>
          </View>
        </View>
        <View style={styles.seperator} />
      </View>
    )
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: COLORS.white, margin: 10 }}>
        <Text style={{ color: COLORS.gray, marginLeft: 10, paddingVertical: 4, fontWeight: 'bold' }}><FontAwesome name='bookmark' color={COLORS.gray} size={15} /> {'  '}Wishlist
          <Text style={{ color: COLORS.darkgray, fontSize: 12 }}> ( {wish.length || 0} Items )</Text></Text>
        <View style={[styles.seperator, { backgroundColor: COLORS.lgray }]} />

        {isLoading ? <ActivityIndicator size="large" color="orange" /> :
          <View>
            {wish.length !== undefined ? <FlatList
              data={wish}
              keyExtractor={item => `${item.id}`}
              renderItem={renderItem}
            /> :
              <View style={styles.emptyCartContainer}>
                <Image
                  source={{ uri: 'https://static.thenounproject.com/png/3551002-200.png' }}
                  resizeMode='contain'
                  style={{
                    width: '100%',
                    height: 200
                  }}
                />
                <Text style={styles.emptyCartMessage}>Your Wishlist is empty !!!</Text>
                <Text style={{ color: COLORS.gray, fontSize: 14, textAlign: 'center' }}>Explore more and shortlist products.</Text>
                <Button bText='Start Shopping' onPress={() => {
                  navigation.navigate('Home'),
                    showMessage({
                      message: "Let's Shop",
                      description: "Let's Start Shopping 💕 ❤ ",
                      type: "success",
                    });
                }} />
              </View>}
          </View>
        }
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.container, { marginTop: 40 }]}>
      <HeaderBar titleText='Wishlist Products' onPress={() => navigation.goBack()} />
      <ScrollView style={[styles.container, { marginTop: -20 }]} showsVerticalScrollIndicator={false}>
        {renderWish()}
      </ScrollView>
      <View style={{ position: 'absolute', top: 10, right: 20, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ShoppingCartIcon cartCount={cartCount}/>
            </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  ostock:{
    color:COLORS.bgcolor,fontWeight:'bold',
    backgroundColor:COLORS.lightGray,
    borderRadius:2,
    paddingHorizontal:10,
    paddingVertical:4
},
text: {
    color: COLORS.bgcolor,
    fontSize: 18,
    lineHeight: 90,
    paddingTop:10,
    fontWeight: "bold",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.41)',
    width:'100%',
    height:'100%',
    borderRadius:5
  },
  emptyCartMessage: {
    color: COLORS.bgcolor,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 15
  },
  containerbo: {
    flex: 1,
    flexDirection: 'row',
    padding: 1,
    marginTop: -18
  },
  left: {
    width: 140,
    padding: 10,
    paddingTop: 40,
  },
  imgBox: {
    width: 120,
    height: 110,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius
  },
  right: {
    flex: 1,
    padding: 4
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.bgcolor
  },
});

//make this component available to the app
export default Like;
