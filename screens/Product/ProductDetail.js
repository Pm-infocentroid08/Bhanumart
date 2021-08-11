//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, ToastAndroid, Alert } from 'react-native';
import { FONTS, SIZES, COLORS } from '../../constants/index'

import { Ionicons, Entypo, FontAwesome, AntDesign } from 'react-native-vector-icons'
import HeaderBar from './../../components/HeaderBar/index';

import {  useSelector } from 'react-redux'

import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import { showMessage } from "react-native-flash-message";
import WishlistIcon from './../../components/WishlistIcon';

// create a component
const ProductDetail = ({ route, navigation }) => {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [shouldShow, setShouldShow] = useState(false);
    const [speShow, setSpeShow] = useState(false);
    const [usesShow, setUsesShow] = useState(false);
    const userInfo = useSelector(state => state.users)
    const [vid, setVid] = useState(null);
    const [size, setSize] = useState(null);
    const [price, setPrice] = useState(null);
    const [dprice, setDprice] = useState(null);
    const [off, setOff] = useState(null);
    const [cartCount,setCartCount]=useState(0);
    const [prodImg, setProdImg] = useState(null);
    const [varImg, setVarImg] = useState(null);
    const [ratmsg, setRatMsg] = useState('');
    const [userRat, setUserRat] = useState('');
    const [userRatData, setUserRatData] = useState('');
    
    let pvid = product?.varients[0].id;
    const [selectedCategory, setSelectedCategory] = useState(pvid);
   
    React.useEffect(() => {
        let { item } = route.params;
        let { product } = route.params;

        setProduct(item || product);
        getRatingCom(item.id || product.id)
        getCartProduct();
    },[2000])

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

    const getRatingCom = (id) => {
        const myHeadersrat = new Headers();

        const formdatarat = new FormData();
        formdatarat.append("product_id", id);

        const requestOptionsrat = {
            method: 'POST',
            headers: myHeadersrat,
            body: formdatarat,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_reviews", requestOptionsrat)
        .then(response => response.json())
        .then((responseJson) => {
            if (responseJson.responce === true) {
                setUserRat(responseJson.rating);
                setUserRatData(responseJson.data);
            } else {
                setUserRat('');
                setUserRatData('');
            }
        })
        .catch(error => console.log('error', error));
    }
    const add_cart = (item) => {
        
        const myHeadersadd = new Headers();
        const formdataadd = new FormData();
        formdataadd.append("user_id", userInfo);
        formdataadd.append("product_id", item.id);
        formdataadd.append("product_name", item.product_name);
        formdataadd.append("price", item.sale_price);
        formdataadd.append("qty", qty);
        formdataadd.append("variant_id", vid || item.varients[0].id);


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
                    showMessage({
                        message: responseJson.massage,
                        type: "success",
                    });
                    getCartProduct();
                } else {
                    setErrortext(responseJson.massage);
                    Alert.alert(responseJson.massage);
                }
            })
            .catch(error => console.log('error', error));
    }
    const showToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    };
    const add_wishlist = (item) => {
        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("product_id", item.id);
        formdata.append("product_name", item.product_name);
        formdata.append("qty", "1");
        formdata.append("variant_id", vid || item.varients[0].id);
        formdata.append("price", dprice || item.varients[0].sale_price);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/add_to_wishlist", requestOptions)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.responce === true) {
                    showMessage({
                        message: responseJson.massage,
                        type: "success",
                    });
                    showToast(responseJson.massage)
                } else {
                    setErrortext(responseJson.massage);
                    showToast(responseJson.massage)
                }
            })
            .catch(error => console.log('error', error));

    }
    const chekRating = () => {
        const myHeadersck = new Headers();

        const formdatack = new FormData();
        formdatack.append("user_id", userInfo);
        formdatack.append("product_id", product?.id);

        const requestOptionsck = {
            method: 'POST',
            headers: myHeadersck,
            body: formdatack,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/review_porduct_check", requestOptionsck)
            .then(response => response.json())
            .then((responseJson) => {
                if (responseJson.responce === true) {
                    navigation.navigate('Rating', { product })
                } else {
                    setRatMsg('You will be eligible to rate this product once you buy it.');
                }
            })
            .catch(error => console.log('error', error));
    }

    function renderItem() {
        return (
            <View style={styles.conBox}>

                <TouchableOpacity onPress={() => navigation.navigate('SimilarProd', { product })}>
                    <Text style={{ fontSize: 12, fontWeight: '200', backgroundColor: COLORS.lightGray, padding: 2, marginVertical: 6, width: '50%', marginHorizontal: SIZES.base * 1.3, textAlign: 'center', color: COLORS.bgcolor }}>See More popular product</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', width: '70%' }}>
                    <Text style={{ fontSize: 18, color: COLORS.black, marginRight: 10, paddingVertical: SIZES.base }}>{product?.product_name},{' '}{size || product?.varients[0].size}</Text>

                </View>
                <View style={{ flexDirection: 'row', paddingLeft: SIZES.base, alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, marginRight: 5 }}>
                        Our Price : {' '}
                        Rs.
                        {dprice || product?.varients[0].sale_price}
                    </Text>

                    <Text style={{ paddingHorizontal: 4, fontSize: 11, color: COLORS.lgray }}>MRP :</Text>
                    <Text style={{ textDecorationLine: 'line-through', color: COLORS.lgray, fontSize: 10 }}>
                        Rs.
                        {price || product?.varients[0].product_price}
                    </Text>
                    {
                        (Number(product?.varients[0].discount) < 1 && (Number(off) < 1) ? <View /> : <Text style={{ padding: SIZES.base * 0.05, paddingHorizontal: 2, backgroundColor: COLORS.bgcolor, marginLeft: SIZES.base, color: COLORS.white, fontSize: 11, fontWeight: 'bold' }}>{off || product?.varients[0].discount}% OFF</Text>)
                    }

                </View>
                <Text style={{ paddingLeft: SIZES.base, fontSize: 10, color: COLORS.gray }}>(Inclusice of all taxes)</Text>
                <View style={{ flexDirection: 'row', paddingLeft: SIZES.base,alignItems:'center' }}>
                     <Text style={{ padding: 1, paddingHorizontal: SIZES.radius, backgroundColor: COLORS.bgcolor, marginVertical: SIZES.base, borderRadius: SIZES.radius, color: COLORS.white, alignSelf: 'center', alignItems: 'center', fontSize: 11 }}>{userRat || 0}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.white} /></Text> 
                     {userRat? <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: SIZES.base,alignItems:'center' }}
                     onPress={()=>navigation.navigate('VRComment',{userRatData})}>
                            <Text style={{color:COLORS.gray,marginHorizontal:10,fontSize:10}}>User Ratings</Text>                            
                                <Ionicons name='chevron-forward-outline' color={COLORS.gray} size={10}/>                        
                     </TouchableOpacity>:<View/>}
                </View>
                {
                    varImg !== null ?<TouchableOpacity style={styles.imageBox} onPress={() => navigation.navigate('PoodImage', { product:varImg })}>
                    {
                        prodImg === null ? 
                        <View style={styles.imageBox}>
                            {
                                varImg.slice(0,1).map((item)=>(<Image
                            resizeMode='contain'
                            source={{ uri: item.mi}}
                            style={styles.imageCl}
                        /> 
                         ))
                            }
                        </View>:
                       
                                    <Image
                                resizeMode='contain'
                                source={{ uri: prodImg }}
                                style={styles.imageCl}
                            />
                               
                            
                    }
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.imageBox} onPress={() => navigation.navigate('PoodImage', { product: product?.varients[0].image})}>
                    {
                        prodImg === null ? 
                        <View style={styles.imageBox}>
                        {
                            product?.varients[0].image.slice(0,1).map((item)=>(<Image
                            resizeMode='contain'
                            source={{ uri: item.mi }}
                            style={styles.imageCl}
                        />  ))
                        }
                        </View>:
                        
                                <Image
                                resizeMode='contain'
                                source={{ uri: prodImg}}
                                style={styles.imageCl}
                            />

                           
                            
                    }
                </TouchableOpacity>
                }
                

                <View >
                    
                         
                        {
                            varImg !== null ? 
                            <View style={styles.butImg}>
                            {
                                varImg.slice(0,3).map((item,index)=>(
                                    <TouchableOpacity style={[styles.imgButB, { marginLeft: 5 }]} onPress={() => {setProdImg(item.mi)}}
                                    key={index}>
                            <Image
                            source={{ uri: item.mi }}
                            style={{ width: '100%', height: '90%' }}
                            resizeMode='contain'
                        />
                        </TouchableOpacity>
                                ))
                            }
                            {
                                varImg.length <4 ? <View/>:
                                <TouchableOpacity style={[styles.imgButB, { marginLeft: 5,width:60 }]} onPress={() => navigation.navigate('PoodImage', { product:varImg })}
                                 >
                                <Text style={{fontSize:22,color:COLORS.gray,fontWeight:'bold'}}>+{varImg.length-3}</Text>
                                </TouchableOpacity>
                            }
                            
                            </View>:
                            <View style={styles.butImg}>
                            {
                                product?.varients[0].image.slice(0,3).map((item,index)=>(
                                    <TouchableOpacity style={[styles.imgButB, { marginLeft: 15 }]} onPress={() => {setProdImg(item.mi)}}
                                    key={index}>
                          <Image
                            source={{ uri: item.mi }}
                            style={{ width: '100%', height: '90%' }}
                            resizeMode='contain'
                        /> 
                        </TouchableOpacity>
                                ))
                            }
                            {
                                product?.varients[0].image.length <4 ? <View/>:
                                <TouchableOpacity style={[styles.imgButB, { marginLeft: 5,width:60 }]} onPress={() => navigation.navigate('PoodImage', { product: product?.varients[0].image})}
                                 >
                                <Text style={{fontSize:22,color:COLORS.gray,fontWeight:'bold'}}>+{product?.varients[0].image.length-3}</Text>
                                </TouchableOpacity>
                            }
                            </View>
                        }
                     
                </View>
                <View style={[styles.sepreator, { marginVertical: 6, backgroundColor: COLORS.lgray }]} />
                <View style={{ flex: 1, padding: SIZES.base }}>

                    <Text style={{ ...FONTS.h2, fontWeight: 'bold', paddingLeft: SIZES.radius, marginVertical: 6 }}>Pack Sizes</Text>
                    {product?.varients.map(item => (
                        <TouchableOpacity style={{
                            flex: 1, flexDirection: 'row',
                            height: 50, borderWidth: 1, paddingHorizontal: SIZES.radius,
                            borderRadius: 6, borderColor: (selectedCategory === item.id) ? COLORS.bgcolor : COLORS.gray, justifyContent: 'space-between', alignItems: 'center', marginVertical: 5
                        }} onPress={() => { setSize(item.size); setDprice(item.sale_price); setPrice(item.product_price); setOff(item.discount); setVid(item.id); setSelectedCategory(item.id),setVarImg(item.image) }}>
                            <View>
                                <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.gray, marginRight: 10, paddingVertical: SIZES.base, marginTop: 5 }}>{item.size}</Text>
                                {
                                    (Number(item.discount) < 1) ? <View /> : <Text style={{
                                        position: 'absolute', top: 0, left: -12, backgroundColor: (selectedCategory === item.id) ? COLORS.bgcolor : COLORS.gray, padding: 1, width: 60, fontSize: 11, textAlign: 'center', fontWeight: 'bold', color: COLORS.white, borderTopLeftRadius: 5,
                                        borderBottomRightRadius: 5
                                    }}>{item.discount}% off</Text>
                                }
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Our Price : {' '}
                                    <FontAwesome name='rupee' color={COLORS.black} size={14} />
                                    {item.sale_price}
                                </Text>
                                <Text style={{ textDecorationLine: 'line-through', color: COLORS.gray }}>
                                    MRP :
                                    {' '}
                                    <FontAwesome name='rupee' color={COLORS.gray} size={14} />
                                    {item.product_price}
                                </Text>
                            </View>
                            <View style={{ width: 16, height: 16, borderRadius: 8, marginRight: SIZES.padding * 0.6, padding: 2, backgroundColor: (selectedCategory === item.id) ? COLORS.bgcolor : COLORS.gray }} />
                        </TouchableOpacity>
                    ))}


                </View>
            </View>
        )
    }
    function renderDetail() {
        return (
            <View style={{ flex: 1, width: '100%', padding: SIZES.base, marginVertical: SIZES.base, backgroundColor: COLORS.white }}>
                <Text style={{ ...FONTS.h2, paddingLeft: 5, paddingVertical: SIZES.base }}>About this product</Text>
                <View style={styles.sepreator} />
                <View style={{ flexDirection: 'row', padding: SIZES.radius, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.gray, paddingLeft: 5, paddingVertical: SIZES.base }}>Product Description</Text>
                    <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                        {shouldShow ? <Entypo name='chevron-up' color={COLORS.gray} size={SIZES.padding} /> : <Entypo name='chevron-down' color={COLORS.gray} size={SIZES.padding} />}
                    </TouchableOpacity>
                </View>
                {shouldShow ? (
                    <Text style={{ fontSize: 15, color: COLORS.gray, paddingVertical: SIZES.radius, paddingLeft: SIZES.radius }}>{product?.product_description}</Text>
                ) : null}
                <View style={styles.sepreator} />
                <View style={{ flexDirection: 'row', padding: SIZES.radius, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.gray, paddingLeft: 5, paddingVertical: SIZES.base }}>Specification</Text>
                    <TouchableOpacity onPress={() => setSpeShow(!speShow)}>
                        {speShow ? <Entypo name='chevron-up' color={COLORS.gray} size={SIZES.padding} /> : <Entypo name='chevron-down' color={COLORS.gray} size={SIZES.padding} />}
                    </TouchableOpacity>
                </View>
                {speShow ? (
                    <Text style={{ fontSize: 15, color: COLORS.gray, paddingVertical: SIZES.radius, paddingLeft: SIZES.radius }}>{product?.specification}</Text>
                ) : null}
                <View style={styles.sepreator} />
                <View style={{ flexDirection: 'row', padding: SIZES.radius, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.gray, paddingLeft: 5, paddingVertical: SIZES.base }}>How to use</Text>
                    <TouchableOpacity onPress={() => setUsesShow(!usesShow)}>
                        {usesShow ? <Entypo name='chevron-up' color={COLORS.gray} size={SIZES.padding} /> : <Entypo name='chevron-down' color={COLORS.gray} size={SIZES.padding} />}
                    </TouchableOpacity>
                </View>
                {usesShow ? (
                    <Text style={{ fontSize: 15, color: COLORS.gray, paddingVertical: SIZES.radius, paddingLeft: SIZES.radius }}>{product?.uses}</Text>
                ) : null}
                <View style={styles.sepreator} />
            </View>
        )
    }
    function renderRating() {
        return (
            <View style={{ flex: 1, padding: SIZES.base, marginVertical: SIZES.base, backgroundColor: COLORS.white, marginHorizontal: 10 }}>
                <Text style={{ fontSize: 18, paddingLeft: 1, paddingVertical: SIZES.base, color: COLORS.darkgray }}>Ratings And Reviews</Text>
                <View style={[styles.sepreator, { backgroundColor: COLORS.lgray }]} />
                <Image
                    source={{ uri: 'https://disrv.com/wp-content/uploads/2019/08/5-gold-stars-png-9.jpg' }}
                    resizeMode='contain'
                    style={{ marginVertical: 5, width: 150, height: 60, alignSelf: 'center' }}
                />
                {
                    ratmsg === '' ? <View /> :
                        <Text style={{ backgroundColor: COLORS.lightGray, fontWeight: 'bold', color: COLORS.black, paddingHorizontal: 15, paddingVertical: 4, marginVertical: 5 }}>{ratmsg}</Text>
                }
                <TouchableOpacity style={{
                    flex: 1, height: 40, marginHorizontal: 25, marginBottom: 15, backgroundColor: COLORS.lightGray, borderRadius: 8, elevation: 15,
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={chekRating}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.darkgray, fontSize: 18, textTransform: 'uppercase', letterSpacing: 2 }}>Start Rating</Text>
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.container, { marginTop: 40 }]}>
            <HeaderBar titleText={product?.name} onPress={() => navigation.goBack()} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
                {renderItem()}
                {renderDetail()}
                {renderRating()}
            </ScrollView>
            <View style={{ position: 'absolute', top: 10, right: 45, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <WishlistIcon/>
            </View>
            <View style={{ position: 'absolute', top: 10, right: 10, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30 }}>
                <ShoppingCartIcon cartCount={cartCount}/>
            </View>
            {
                product?.stock_status === '0' ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, paddingHorizontal: SIZES.base }}>
                        <View style={{ flex: 1, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightGray }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.bgcolor }}>Out of Stock</Text>
                        </View>
                    </View>
                    : <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, paddingHorizontal: SIZES.base }}>
                        <TouchableOpacity style={{ flex: 1, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bgcolor }}
                            onPress={() => { add_cart(product) }}>
                            <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.white }}>ADD TO CART</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, height: 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lgray, marginHorizontal: SIZES.base }}
                            onPress={() => { add_wishlist(product) }}>
                            <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.white }}>ADD TO WISHLIST</Text>

                        </TouchableOpacity>
                    </View>
            }

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SIZES.width,
        height: SIZES.height
    },
    conBox: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    butImg: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        alignItems: 'center'
    },
    imgButB: {
        width: 60, height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray
    },
    imageBox: {
        width: SIZES.width,
        height: SIZES.height * 0.3,
        alignItems: 'center',
        paddingTop: 15
    },
    imageCl: {
        width: SIZES.width,
        height: SIZES.height * 0.25,
        alignSelf: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    heaseBox: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        top: 30
    },
    boContainer: {
        backgroundColor: 'rgba(255,255,255,0.43)',
        height: SIZES.padding * 2,
        width: SIZES.padding * 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius
    },
    likeBox: {
        position: 'absolute',
        bottom: 60,
        right: 30
    },
    shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 2.56,
        shadowRadius: 3.84,
        elevation: 25
    },
    detailsContainer: {
        flex: 1,
        width: '100%',
        padding: 15
    },
    tiBoc: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 15
    },
    texBox: {
        flex: 1,
    },
    price: {
        width: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sepreator: {
        flex: 1,
        width: '100%',
        height: 1,
        backgroundColor: COLORS.bgcolor
    },
});

//make this component available to the app
export default ProductDetail;
