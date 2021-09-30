//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,
ImageBackground,FlatList,ActivityIndicator,ToastAndroid,Platform,Alert } from 'react-native';
import { COLORS, FONTS, SIZES } from './../../constants/theme';
import HeaderBar from './../../components/HeaderBar/index';
import WishlistIcon from '../../components/WishlistIcon';
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import { showMessage } from "react-native-flash-message";
import { Picker as SelectPicker } from '@react-native-picker/picker';
import { BASE_URL } from './../../Base';
import { Feather, Ionicons, FontAwesome } from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
// create a component
const BItem = ({navigation}) => {
    const [cartCount, setCartCount] = useState(0);
    const [data,setData]= useState('');
    const [isLoading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState([]);
    const userInfo = useSelector(state => state.users);
    const [qty, setQty] = useState(1);

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

        fetch(BASE_URL+"get_cart_detail", requestOptionscar)
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

    const getProduct = () => {
        const myHeadersP = new Headers();
        const requestOptionsP = {
            method: 'GET',
            headers: myHeadersP,
            redirect: 'follow'
        };

        fetch(BASE_URL+"get_new_listing_products", requestOptionsP)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setData(result.data);
                } else {
                    showMessage({
                        message: result.massage,
                        type: "warning",
                    });
                }

            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(()=>{
        getProduct();
        getCartProduct();
    },[navigation]);

    const add_cart = (item) => {
        if (item.id === selectedValue.product_id) {

            const myHeadersadd = new Headers();
            const formdataadd = new FormData();
            formdataadd.append("user_id", userInfo);
            formdataadd.append("product_id", item.id);
            formdataadd.append("product_name", item.product_name);
            formdataadd.append("price", item.varients[0].sale_price);
            formdataadd.append("qty", qty);
            formdataadd.append("variant_id", selectedValue.id);


            const requestOptionsadd = {
                method: 'POST',
                headers: myHeadersadd,
                body: formdataadd,
                redirect: 'follow'
            };

            fetch(BASE_URL+"add_to_cart", requestOptionsadd)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        if(Platform.OS==='ios'){
                            showMessage({
                                message: responseJson.massage,
                                type: "success",
                            });
                        }else{
                            showToastWithGravity('Added to Cart');
                        } 
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch(error => console.log('error', error));
        } else {

            const myHeadersadd = new Headers();
            const formdataadd = new FormData();
            formdataadd.append("user_id", userInfo);
            formdataadd.append("product_id", item.id);
            formdataadd.append("product_name", item.product_name);
            formdataadd.append("price", item.varients[0].sale_price);
            formdataadd.append("qty", qty);
            formdataadd.append("variant_id", item.varients[0].id);


            const requestOptionsadd = {
                method: 'POST',
                headers: myHeadersadd,
                body: formdataadd,
                redirect: 'follow'
            };

            fetch(BASE_URL+"add_to_cart", requestOptionsadd)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        if(Platform.OS==='ios'){
                            showMessage({
                                message: responseJson.massage,
                                type: "success",
                            });
                        }else{
                            showToastWithGravity('Added to Cart');
                        } 
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch(error => console.log('error', error));
        }

    }
    const renderList=()=>{
        const renderItem = ({ item }) => (
            <View key={item.id}>
                <View style={styles.containerItem} >
                    <View style={styles.left}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item })}>
                            {
                                item.stock_status === '0' ?
                                    <View>
                                        {
                                            item.varients.length < 2 ?
                                                <View>
                                                    {
                                                        item.varients[0].image.slice(0, 1).map(item => (
                                                            <View>
                                                                {
                                                                    item !== '' || undefined ?
                                                                        <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={styles.text}>
                                        <Text style={{fontWeight:'bold',color:COLORS.white,textAlign:'center',transform: [{ rotate: '315deg' }],fontSize:16}}>Out of Stock</Text>
                                        </View>
                                                                        </ImageBackground> :
                                                                        
                                                                         <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU'}} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                        <View style={styles.text}>
                                        <Text style={{fontWeight:'bold',color:COLORS.white,textAlign:'center',transform: [{ rotate: '315deg' }],fontSize:16}}>Out of Stock</Text>
                                        </View>
                                                                        </ImageBackground>
                                                                }
                                                            </View>
                                                        ))
                                                    }
                                                </View> :
                                                <View>
                                                    {
                                                        selectedValue.product_id === item.id ?
                                                            <View>
                                                                {
                                                                    selectedValue.image.slice(0, 1).map(item => (
                                                                        <View>
                                                                            {
                                                                                item !== '' || undefined ?

                                                                                    <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <View style={styles.text}>
                                        <Text style={{fontWeight:'bold',color:COLORS.white,textAlign:'center',transform: [{ rotate: '315deg' }],fontSize:16}}>Out of Stock</Text>
                                        </View>
                                                                                    </ImageBackground> :

                                                                                    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <View style={styles.text}>
                                        <Text style={{fontWeight:'bold',color:COLORS.white,textAlign:'center',transform: [{ rotate: '315deg' }],fontSize:16}}>Out of Stock</Text>
                                        </View>
                                                                                    </ImageBackground>
                                                                            }
                                                                        </View>

                                                                    ))
                                                                }
                                                            </View>
                                                            :
                                                            <View>
                                                                {
                                                                    item.varients[0].image.slice(0, 1).map(item => (
                                                                        <View>
                                                                            {
                                                                                item !== '' || undefined ?
                                                                                    <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <View style={styles.text}>
                                        <Text style={{fontWeight:'bold',color:COLORS.white,textAlign:'center',transform: [{ rotate: '315deg' }],fontSize:16}}>Out of Stock</Text>
                                        </View>
                                                                                    </ImageBackground>
                                                                                    :

                                                                                    <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <View style={styles.text}>
                                                                                            <Text style={{ fontWeight: 'bold', color: COLORS.white, textAlign: 'center', transform: [{ rotate: '315deg' }], fontSize: 16 }}>Out of Stock</Text>
                                                                                        </View>
                                                                                    </ImageBackground>
                                                                            }
                                                                        </View>
                                                                    ))
                                                                }
                                                            </View>
                                                    }
                                                </View>
                                        }
                                    </View> :
                                    <View >
                                        {
                                            item.varients.length < 2 ?
                                                <View>
                                                    {
                                                        item.varients[0].image.slice(0, 1).map(item => (
                                                            <View style={[styles.imgBox, styles.shadow]}>
                                                                {
                                                                    item !== '' || undefined ?
                                                                        <Image
                                                                            source={{ uri: item.mi }}
                                                                            resizeMode='contain'
                                                                            style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                        /> :
                                                                        <Image
                                                                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                                            resizeMode='contain'
                                                                            style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                        />
                                                                }
                                                            </View>
                                                        ))
                                                    }
                                                </View> :
                                                <View>
                                                    {
                                                        selectedValue.product_id === item.id ?
                                                            <View>
                                                                {
                                                                    selectedValue.image.slice(0, 1).map(item => (
                                                                        <View style={[styles.imgBox, styles.shadow]}>
                                                                            {
                                                                                item !== '' || undefined ?
                                                                                    <Image
                                                                                        source={{ uri: item.mi }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    /> :
                                                                                    <Image
                                                                                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    />
                                                                            }
                                                                        </View>

                                                                    ))
                                                                }
                                                            </View>
                                                            :
                                                            <View>
                                                                {
                                                                    item.varients[0].image.slice(0, 1).map(item => (
                                                                        <View style={[styles.imgBox, styles.shadow]}>
                                                                            {
                                                                                item !== '' || undefined ?
                                                                                    <Image
                                                                                        source={{ uri: item.mi }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    /> :
                                                                                    <Image
                                                                                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                                                        resizeMode='contain'
                                                                                        style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                                                    />
                                                                            }
                                                                        </View>
                                                                    ))
                                                                }
                                                            </View>
                                                    }
                                                </View>
                                        }
                                    </View>
                            }
                        </TouchableOpacity>

                    </View>
                    <View style={styles.right}>
                        <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black, paddingVertical: 6 }}>{item.product_name}</Text>
                        {
                            item.rating ? <Text style={{ padding: SIZES.base * 0.06, backgroundColor: '#ffece6', width: 40, borderRadius: SIZES.base, textAlign: 'center', fontSize: 12, color: COLORS.bgcolor }}>{item.rating || 0}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.bgcolor} /></Text> : <View />
                        }

                        {
                            item.varients.length < 2 ? <View key={item.varients[0].id}>

                                <Text style={{ padding: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, marginVertical: 4, paddingLeft: 12, fontWeight: '500', marginHorizontal: 10 }}>{item.varients[0].size} </Text>
                                <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center' }}>
                                    <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                        <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                        {item.varients[0].sale_price}
                                    </Text>
                                    <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                        <FontAwesome name='rupee' color='#808080' size={10} />
                                        {item.varients[0].product_price}
                                    </Text>

                                    {
                                        (Number(item.varients[0].discount)) < 1 ? <View /> :
                                            <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{item.varients[0].discount}% OFF </Text>
                                            </View>
                                    }


                                </View>
                            </View>
                                :
                                <View key={item.id}>
                                {
                                    Platform.OS==='android'?
                                    <View style={{ height:30, marginHorizontal: 5, paddingLeft:10, borderWidth: 1, borderColor: COLORS.gray, borderRadius: 10 }} key={item.id}>
                                       <SelectPicker
                                            selectedValue={selectedValue}
                                            style={{ height: 30, borderWidth: 1, paddingLeft:Platform.OS==='android'?10:0, borderColor: COLORS.bgcolor, borderRadius: 10 }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedValue(itemValue)
                                            }>
                                            {
                                                item.varients.filter(e => e.product_id === item.id).map(item => (<SelectPicker.Item label={item.size} value={item} key={item.id} />))
                                            }

                                        </SelectPicker>
                                        
                                    </View>:
                                    <View>
                                    {
                                        selectedValue.product_id === item.id ?<Text style={{fontSize:15,fontWeight:'bold',marginBottom:5,backgroundColor:COLORS.lightGray,
                                    paddingVertical:3,width:'50%',textAlign:'center'}}>{selectedValue.size}</Text>:
                                    <Text style={{fontSize:15,fontWeight:'bold',marginBottom:5,backgroundColor:COLORS.lightGray,
                                    paddingVertical:3,width:'50%',textAlign:'center'}}>{item.varients[0].size}</Text>
                                    }
                                    
                                    <Text style={{fontSize:14,fontWeight:'700',marginBottom:5,textAlign:'center'}}>Select Quantity here</Text>
                                    <View style={{ height:30, marginHorizontal: 5,  borderRadius: 10 }} key={item.id}>
                                       <SelectPicker
                                            selectedValue={selectedValue}
                                            itemStyle={{height:30,flex:1,fontWeight:'bold',fontSize:12}}
                                            style={{ height: 30,  borderRadius: 10 }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedValue(itemValue)
                                            }>
                                            {
                                                item.varients.filter(e => e.product_id === item.id).map(item => (<SelectPicker.Item label={item.size} value={item} key={item.id} />))
                                            }

                                        </SelectPicker>
                                        
                                    </View>
                                    </View>
                                   
                                }
                                    
                                    {
                                        selectedValue.product_id === item.id ?
                                            <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center' }} key={item.id}>
                                                <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                                    <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                                    {selectedValue.sale_price}
                                                </Text>
                                                <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                                    <FontAwesome name='rupee' color='#808080' size={10} />
                                                    {selectedValue.product_price}
                                                </Text>

                                                {
                                                    (Number(selectedValue.discount)) < 1 ? <View /> :
                                                        <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{selectedValue.discount}% OFF </Text>
                                                        </View>
                                                }


                                            </View> :
                                            <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center' }} key={item.id}>
                                                <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                                    <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                                    {item.varients[0].sale_price}
                                                </Text>
                                                <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                                    <FontAwesome name='rupee' color='#808080' size={10} />
                                                    {item.varients[0].product_price}
                                                </Text>

                                                {
                                                    (Number(item.varients[0].discount)) < 1 ? <View /> :
                                                        <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{item.varients[0].discount}% OFF </Text>
                                                        </View>
                                                }


                                            </View>
                                    }


                                </View>
                        }


                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            {
                                item.stock_status === '0' ? <View style={{ height: 35, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightGray, marginTop: 10 }}
                                    key={item.id}>
                                    <Text style={{ fontWeight: 'bold', color: COLORS.bgcolor, ...FONTS.h2, paddingHorizontal: 40 }}>Out of Stock</Text>
                                </View> : <TouchableOpacity
                                    style={{
                                        height: 30,
                                        borderRadius: 10, justifyContent: 'center',
                                        alignItems: 'center', backgroundColor: COLORS.bgcolor,
                                        marginRight: SIZES.base,
                                        paddingHorizontal: 20,
                                    }}
                                    onPress={() => {
                                        add_cart(item)
                                    }} key={item.id}>
                                    <Text style={{ fontWeight: 'bold', color: COLORS.white, ...FONTS.h2 }}>Add</Text>
                                </TouchableOpacity>
                            }

                        </View>
                    </View>
                </View>
                <View style={styles.seperator} />
            </View>
        )
        return(
            <View>
               {isLoading ? 
               <ActivityIndicator size="large" color="green" /> : 
               
                <View style={{paddingBottom:100}}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                </View>
               }
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Offers Product List' onPress={() => navigation.goBack()} />
            {renderList()}
            <View style={{ position: 'absolute', top: 50, right: 50, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <WishlistIcon/>
            </View>
            <View style={{ position: 'absolute', top: 50, right: 10, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ShoppingCartIcon cartCount={cartCount} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop:50
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
    containerBox: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.35,
        elevation: 5
    },
    child: {
        width: SIZES.width,
        justifyContent: 'center'
    },
    left: {
        width: 140,
        padding: 10,
        paddingTop: 40
    },
    flexContainer: {
        flex: 1,
        height: SIZES.height * 0.25,
        marginVertical: 8,
        borderRadius: SIZES.base,
        margin: 5
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
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
});

//make this component available to the app
export default BItem;
