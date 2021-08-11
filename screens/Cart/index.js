//import liraries
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image, RefreshControl,
  StyleSheet, SafeAreaView, ScrollView, FlatList,ToastAndroid
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_ORDER, getBasketTotal } from '../../ReduxCart/CartItem';
import HeaderBar from './../../components/HeaderBar/index';
import { MaterialIcons, FontAwesome5, Ionicons, FontAwesome } from 'react-native-vector-icons'
import Button from './../../components/Container/Button';
import { showMessage } from "react-native-flash-message";
import { COLORS, FONTS, SIZES } from '../../constants';
import { SwipeListView } from 'react-native-swipe-list-view'
import Loader from '../Loader';
import { useIsFocused } from '@react-navigation/native'
// create a component


const Cart = ({ navigation }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errortext, setErrortext] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(1)
  const userInfo = useSelector(state => state.users)
  const isFocused = useIsFocused();
  const [vid, setVid] = useState(null);

  const dispatch = useDispatch();
  const removeItemFromCart = item =>
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item
    })
    const showToastWithGravity = (msg) => {
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    };
    const showToastWithGravityAndOffset = (msg) => {
      ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50
      );
    };
  const getProduct = () => {
    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append("user_id", userInfo);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/get_cart_detail", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          setProduct(result.data)
        } else {
          setProduct(0)
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false))
      .finally(setLoading.bind(undefined, false));

  }
  const removeProd = (item) => {
    removeItemFromCart(item)
    const myHeaders = new Headers();


    const formdata = new FormData();
    formdata.append("cart_id", item.id);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
            fetch("https://bhanumart.vitsol.in/api/remove_cart_item", requestOptions)
              .then(response => response.json())
              .then((responseJson) => {

                if (responseJson.responce === true) {
                  getProduct();
                  
                } else {
                  setErrortext(responseJson.msg);

                }
              })
              .catch(error => { console.log('error', error); setLoading(false); })
              .finally(() => setLoading(false))
              .finally(setLoading.bind(undefined, false));
     
  }
  const getTotal = () => {
    let total = 0;
    const items = product;
    for (let i = 0; i < items.length; i++) {
      let sum = Number(items[i].price * items[i].qty)
      total = total + sum
    }
    return <Text style={styles.totText}>Total : Rs.&nbsp;{total}</Text>
  }

  const getTotalSave = () => {
    let total = 0;
    const items = product;
    for (let i = 0; i < items.length; i++) {
      let sum = Number(items[i].varients.product_price * items[i].qty)- Number(items[i].varients.sale_price * items[i].qty)
      total = total + sum
    }
    return <Text style={{color:'green',textTransform:'capitalize',fontWeight:'bold',fontSize:14}}>Discount on MRP : Rs.&nbsp;{total}</Text>
  }

  useEffect(() => {

    getProduct();
    
   }, [isFocused])


  function editOrder(prodId, type) {

    const myHeadersadd = new Headers();
    const formdataadd = new FormData();
    formdataadd.append("cart_id", prodId);
    formdataadd.append("type", type);

    const requestOptionsadd = {
      method: 'POST',
      headers: myHeadersadd,
      body: formdataadd,
      redirect: 'follow'
    };
    fetch("https://bhanumart.vitsol.in/api/update_cart_item_qty", requestOptionsadd)
      .then(response => response.json())
      .then(result => {
        if (result.responce === true) {
          getProduct();
        }
      })
      .catch(error => console.log('error', error));
  }
  
  const add_wishlist = (item) => {
    const formdata = new FormData();
    formdata.append("user_id", userInfo);
    formdata.append("product_id",item.product_id);
    formdata.append("product_name", item.product_name);
    formdata.append("qty", "1");
    formdata.append("variant_id", item.varients.id);
    formdata.append("price", item.varients.sale_price);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://bhanumart.vitsol.in/api/add_to_wishlist", requestOptions)
    .then(response => response.json())
    .then((responseJson) => {
        if (responseJson.responce === true) {
          showToastWithGravity('Product Add to Wishist')
          removeProd(item);
          getProduct();
        } else {
            setErrortext(responseJson.massage);
        }
    })
    .catch(error => console.log('error', error));
    
}


  function renderCart() {

    return (
      <View
        style={{
          flex: 1,
        }}>

        {product.length !== undefined ? (
          <View>
            {loading ? <ActivityIndicator size="large" color="orange" /> : <SwipeListView
              data={product}
              renderItem={(data, rowMap) => (
                <View key={data.item.id.toString()}>
                  <View style={styles.bookItemContainer}>
                    <View style={styles.ImCont}>
                      <View style={styles.imgBox}>
                        <Image source={{ uri: data.item.image }} style={styles.thumbnail}
                          resizeMode='contain'
                        />
                      </View>
                      <View style={styles.bookItemMetaContainer}>
                      <View style={{flexDirection:'row'}}>
                      <View style={{flex:1}}>
                        <Text style={[styles.textTitle,{flex:1}]} numberOfLines={2}>
                        {data.item.product_name}
                        </Text>
                        <Text style={styles.textAuthor}>{data.item.varients.size}</Text>
                      </View>
                      <TouchableOpacity
                      onPress={() => {
                        removeProd(data.item)                          
                      }}
                      style={{ borderWidth: 1, borderColor: COLORS.bgcolor, borderRadius: 4, width:30,height:30,
                      justifyContent:'center',alignItems:'center' }}>
                      <MaterialIcons name='delete' size={16} color={COLORS.bgcolor}/>
                    </TouchableOpacity>
                      </View>
                      
                      
                      <View style={{flexDirection:'row',flex:1}}>
                       
                        <Text style={[styles.textAuthor,{textDecorationLine: 'line-through',fontSize:11,marginRight:5}]}>Rs {data.item.varients.product_price} </Text>
                        <Text style={[styles.textAuthor,{color:COLORS.black,fontSize:14,fontWeight:'bold'}]}>Rs {data.item.varients.sale_price} </Text>
                        
                      </View>
                      <Text style={[styles.textAuthor, { fontWeight: 'bold', ...FONTS.h2, color: 'tomato', marginTop: 5 }]} >Total Rs {data.item.qty * data.item.price}</Text>
                    </View>
                      </View>
                      <View style={[styles.seperator, { backgroundColor: COLORS.lgray }]} />
                      <View style={{flexDirection:'row'}}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical:1,width:'30%',marginTop:3 }}>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => {
                          editOrder(data.item.id, "decrement");                          
                        }}
                        >
                          <Text style={styles.qBtext}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.qBtext}>{data.item.qty}</Text>

                        <TouchableOpacity style={styles.qtyBtn} onPress={() => {
                          editOrder(data.item.id, "increment");                         
                        }}>
                          <Text style={styles.qBtext}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.seperator, { backgroundColor: COLORS.lgray,height:35,width:1,marginHorizontal:10,marginTop:5 }]} />
                      <View style={{flex:1,height:35,marginTop:3}}>
                        <TouchableOpacity style={{
                        flex:1,height:25,borderRadius:5,backgroundColor:COLORS.white,elevation:10,
                        justifyContent:'center',alignItems:'center',backgroundColor:COLORS.lgray,marginHorizontal:15,marginTop:5}}
                        onPress={()=>add_wishlist(data.item)}>
                          <Text style={{color:COLORS.white,fontWeight:'bold'}}>Move To Wishlist</Text>
                        </TouchableOpacity>
                      </View>
                      
                      </View>
                     
                   

                    
                  </View>

                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <View style={{
                    width: 75,
                    height: '100%',
                    marginVertical: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: 0,
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        removeProd(data.item)
                          
                      }}
                      style={{ borderWidth: 1, borderColor: '#fff', borderRadius: 4, padding: 10 }}>
                      <MaterialIcons name='delete' size={25} color='#fff' />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              rightOpenValue={-75}
            />}
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDkQ-8_HgHissWRpnjEnsC8_x0HLfnWsiGasFt8H8Y-4WBvOmmWzPhFOqbzQh6zeIYHg&usqp=CAU' }}
              resizeMode='contain'
              style={{
                width: '100%',
                height: 200
              }}
            />
            <Text style={styles.emptyCartMessage}>Your cart is empty !!!</Text>
            <Button bText='Start Shopping' onPress={() => {
              navigation.navigate('Home'),
                showMessage({
                  message: "Let's Shop",
                  description: "Let's Start Shopping 💕 ❤ ",
                  type: "success",
                });
            }} />
          </View>
        )}
      </View>
    )
  }
 
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <HeaderBar titleText='My Cart' onPress={() => navigation.goBack()} />
      <Text style={{ textAlign: 'right', paddingRight: 45, ...FONTS.h2, color: COLORS.black, paddingBottom: 1,marginTop:-25 }}>Cart Count:{' '}{product.length||0} items</Text>

      <ScrollView style={{ flex: 1 }}>
        {renderCart()}
      </ScrollView>
      {product.length !== undefined ? (<View style={{ paddingHorizontal:10, backgroundColor: '#fff', flex: 1, maxHeight: 75, borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', ...FONTS.h1, textTransform: 'uppercase', color: 'gray' }}>{getTotalSave()} </Text>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', ...FONTS.h1, textTransform: 'uppercase', color: 'tomato' }}>{getTotal()} </Text>
        </View>
        <TouchableOpacity style={{height:35,backgroundColor:COLORS.black,borderRadius:5,
        justifyContent:'center',alignItems:'center'}} onPress={() => {
          navigation.navigate('AddEdt')
        }} >
          <Text style={{color:COLORS.white,fontWeight:'bold'}}>Check Out</Text>
        </TouchableOpacity>

        

      </View>) : (
        <View />
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bookItemContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 15,
    marginVertical: 2
  },
  ImCont: {
    flex: 1,
    flexDirection: 'row',
    padding: 1,
    backgroundColor: '#FFF',
    marginVertical: 2
  },
  imgBox: {
    width: '40%',
    height: 80,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey'
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
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
  qtyBtn: {
    width: 30,
    height: 30, borderRadius: 6,
    justifyContent: 'center', alignItems: 'center',
    borderColor: 'tomato', borderWidth: 1
  },
  qBtext: {
    fontWeight: 'bold',
    fontSize: 12
  },
  bookItemMetaContainer: {
    padding: 5,
    paddingLeft: 20,
    flex:1
  },
  textTitle: {
    ...FONTS.h2,
    fontWeight: '400'
  },
  textAuthor: {
    ...FONTS.h3,
    fontWeight: '200',
    color: COLORS.gray
  },
  buttonContainer: {
    position: 'absolute',
    top: 110,
    left: 10
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5
  },
  buttonText: {
    ...FONTS.h2,
    color: '#fff'
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  emptyCartMessage: {
    ...FONTS.h1,
    paddingVertical: 15
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'tomato',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
});

//make this component available to the app
export default Cart;
