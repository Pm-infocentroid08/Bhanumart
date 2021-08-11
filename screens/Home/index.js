//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator, FlatList, SafeAreaView, 
    ImageBackground, ScrollView, TouchableOpacity, Image, Alert, ToastAndroid,
Platform,Modal } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from 'react-native-vector-icons'
import { images, COLORS, FONTS, SIZES } from '../../constants/index'
import { useSelector } from 'react-redux'
import SearchBox from '../../components/HeaderBar/SearchBox'

import { showMessage } from "react-native-flash-message";
import Banner from './banner';
import { TabRouter, useIsFocused } from '@react-navigation/native'
import { Picker as SelectPicker} from '@react-native-picker/picker'
// create a component

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const Home = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [fproduct, setFProduct] = useState([]);
    const [buproduct, setBuProduct] = useState([]);
    const [reproduct, setReProduct] = useState([]);
    const isFocused = useIsFocused();
    const [qty, setQty] = useState(1);
    const [cartCount, setCartCount] = useState(0);
    const [errortext, setErrortext] = useState('');
    const userInfo = useSelector(state => state.users);
    const [selectedBbValue, setSelectedBbValue] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isOpen,setIsOpen] = useState(false);

    const changeModelVisibility =(bool)=>{
        setIsOpen(bool)
    }

    const showToastWithGravity = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        getProduct();
        getFProduct();
        getBudProduct();
        getTrendProduct();
        getCartProduct();
    }, []);
    const add_cart = (item) => {


        if (item.id === selectedBbValue.product_id) {
            const myHeaders = new Headers();
            const formdata = new FormData();
            formdata.append("user_id", userInfo);
            formdata.append("product_id", item.id);
            formdata.append("product_name", item.product_name);
            formdata.append("price", item.sale_price);
            formdata.append("qty", qty);
            formdata.append("variant_id", selectedBbValue.id);


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://bhanumart.vitsol.in/api/add_to_cart", requestOptions)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        if(Platform.OS==='android'){
                            showToastWithGravity(responseJson.massage);
                        }else{
                            showMessage({
                                message: 'Added to Cart',
                                type: "success",
                            });
                        }
                        
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch((error) => console.error(error));
        } else {
            const myHeaders = new Headers();
            const formdata = new FormData();
            formdata.append("user_id", userInfo);
            formdata.append("product_id", item.id);
            formdata.append("product_name", item.product_name);
            formdata.append("price", item.sale_price);
            formdata.append("qty", qty);
            formdata.append("variant_id", item.varients[0].id);


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://bhanumart.vitsol.in/api/add_to_cart", requestOptions)
                .then(response => response.json())
                .then((responseJson) => {
                    if (responseJson.responce === true) {
                        if(Platform.OS==='android'){
                            showToastWithGravity(responseJson.massage);
                        }else{
                            showMessage({
                                message: 'Added to Cart',
                                type: "success",
                            });
                        }
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch((error) => console.error(error));
        }

    }

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

    const getProduct = () => {
        const myHeadersP = new Headers();
        const requestOptionsP = {
            method: 'GET',
            headers: myHeadersP,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_new_listing_products", requestOptionsP)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setProduct(result.data);
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
    const getFProduct = () => {
        const myHeadersF = new Headers();
        const requestOptionsF = {
            method: 'GET',
            headers: myHeadersF,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_featured_products", requestOptionsF)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setFProduct(result.data);
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
    const getBudProduct = () => {
        const myHeadersB = new Headers();
        const requestOptionsB = {
            method: 'GET',
            headers: myHeadersB,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_lowbudget_products", requestOptionsB)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setBuProduct(result.data);
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
    const getTrendProduct = () => {
        const myHeadersT = new Headers();
        const requestOptionsT = {
            method: 'GET',
            headers: myHeadersT,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_hotdeal_products", requestOptionsT)
            .then(response => response.json())
            .then(result => {
                if (result.responce === true) {
                    setReProduct(result.data);
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


    useEffect(() => {

        getProduct();
        getFProduct();
        getBudProduct();
        getTrendProduct();
        getCartProduct();

        const unsubscribe = navigation.addListener('focus', () => {
            getProduct();
            getFProduct();
            getBudProduct();
            getTrendProduct();
            getCartProduct();
        });
        return unsubscribe;


    }, [isFocused, navigation])

    function renderBottom() {
        const renderItem = ({ item }) => {

            return (

                <View style={{ flex: 1, width: SIZES.width * 0.46, height: 300, backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.base, margin: 5 }} >
                    <TouchableOpacity
                        style={[{ height: SIZES.height * 0.16, borderRadius: SIZES.base, backgroundColor: COLORS.white, marginHorizontal: 10 }, styles.boXShadow]}
                        onPress={() => navigation.navigate('ProductDetail', { item })} key={item.id}>
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
                                                                        <Text style={[styles.text, { fontWeight: 'bold', color: COLORS.white, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }]}>Out of Stock</Text>
                                                                    </ImageBackground> :
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
                                                    selectedBbValue.product_id === item.id ?
                                                        <View>
                                                            {
                                                                selectedBbValue.image.slice(0, 1).map(item => (
                                                                    <View>
                                                                        {
                                                                            item !== '' || undefined ?

                                                                                <ImageBackground source={{ uri: item.mi }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Text style={[styles.text, { fontWeight: 'bold', color: COLORS.white, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }]}>Out of Stock</Text>
                                                                                </ImageBackground> :

                                                                                <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Text style={[styles.text, { fontWeight: 'bold', color: COLORS.white, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }]}>Out of Stock</Text>
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
                                                                                    <Text style={[styles.text, { fontWeight: 'bold', color: COLORS.white, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }]}>Out of Stock</Text>
                                                                                </ImageBackground>
                                                                                :

                                                                                <ImageBackground source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }} resizeMode="cover" style={{ width: '100%', height: '100%', borderRadius: SIZES.base, alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Text style={[styles.text, { fontWeight: 'bold', color: COLORS.white, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10 }]}>Out of Stock</Text>
                                                                                </ImageBackground>
                                                                        }
                                                                    </View>
                                                                ))
                                                            }
                                                        </View>
                                                }
                                            </View>
                                    }
                                </View>
                                :
                                <View>
                                    {
                                        item.varients.length < 2 ?
                                            <View>
                                                {
                                                    item.varients[0].image.slice(0, 1).map(item => (
                                                        <View>
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
                                                    selectedBbValue.product_id === item.id ?
                                                        <View>
                                                            {
                                                                selectedBbValue.image.slice(0, 1).map(item => (
                                                                    <View>
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
                                                                    <View>
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
                    <Text style={{ fontSize: 13, fontWeight: 'bold', paddingVertical: SIZES.base, paddingHorizontal: SIZES.radius }} numberOfLines={1}>{item.product_name}</Text>
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
                                            selectedValue={selectedBbValue}
                                            style={{ height: 30, borderWidth: 1, paddingLeft:Platform.OS==='android'?10:0, borderColor: COLORS.bgcolor, borderRadius: 10 }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedBbValue(itemValue)
                                            }>
                                            {
                                                item.varients.filter(e => e.product_id === item.id).map(item => (<SelectPicker.Item label={item.size} value={item} key={item.id} />))
                                            }

                                        </SelectPicker>
                                        
                                    </View>:
                                    <View>
                                    {
                                        selectedBbValue.product_id === item.id ?<Text style={{fontSize:15,fontWeight:'bold',marginBottom:5,backgroundColor:COLORS.lightGray,
                                    paddingVertical:3,width:'50%',textAlign:'center'}}>{selectedBbValue.size}</Text>:
                                    <Text style={{fontSize:15,fontWeight:'bold',marginBottom:5,backgroundColor:COLORS.lightGray,
                                    paddingVertical:3,width:'50%',textAlign:'center'}}>{item.varients[0].size}</Text>
                                    }
                                    
                                    <Text style={{fontSize:14,fontWeight:'700',marginBottom:5,textAlign:'center'}}>Select Quantity here</Text>
                                    <View style={{ height:30, marginHorizontal: 5,  borderRadius: 10 }} key={item.id}>
                                       <SelectPicker
                                            selectedValue={selectedBbValue}
                                            itemStyle={{height:30,flex:1,fontWeight:'bold',fontSize:12}}
                                            style={{ height: 30,  borderRadius: 10 }}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedBbValue(itemValue)
                                            }>
                                            {
                                                item.varients.filter(e => e.product_id === item.id).map(item => (<SelectPicker.Item label={item.size} value={item} key={item.id} />))
                                            }

                                        </SelectPicker>
                                        
                                    </View>
                                    </View>
                                   
                                }
                                {
                                    selectedBbValue.product_id === item.id ?
                                        <View style={{ flexDirection: 'row', padding: SIZES.base, alignItems: 'center' }} key={item.id}>
                                            <Text style={{ paddingHorizontal: 8, fontWeight: 'bold', fontSize: 14 }}>
                                                <FontAwesome name='rupee' color={COLORS.black} size={12} />
                                                {selectedBbValue.sale_price}
                                            </Text>
                                            <Text style={{ textDecorationLine: 'line-through', fontSize: 12, color: '#808080' }}>
                                                <FontAwesome name='rupee' color='#808080' size={10} />
                                                {selectedBbValue.product_price}
                                            </Text>

                                            {
                                                (Number(selectedBbValue.discount)) < 1 ? <View /> :
                                                    <View style={{ backgroundColor: COLORS.bgcolor, padding: 0.5, paddingHorizontal: 5, marginLeft: 10 }}><Text style={{ color: COLORS.white, fontSize: SIZES.radius, fontWeight: 'bold' }}>{selectedBbValue.discount}% OFF </Text>
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
                    {
                        item.stock_status === '0' ? <View style={{ height: 35, marginHorizontal: 6, borderRadius: SIZES.radius, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightGray, marginTop: Platform.OS==='android'?10:0 }}
                            key={item.id}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.bgcolor, ...FONTS.h2 }}>Out of Stock</Text>
                        </View> : <TouchableOpacity style={{ height: 35, marginHorizontal: 6, borderRadius: SIZES.radius, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.bgcolor, marginTop:1}}
                            onPress={() => {
                                add_cart(item)
                            }} key={item.id}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.white, ...FONTS.h2 }}>Add</Text>
                        </TouchableOpacity>
                    }


                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}

                </View>

            )
        }
        return (
            <View style={{ marginVertical: 6, flex: 1, width: '100%' }}>
                <Banner />
                {isLoading ? <ActivityIndicator size="large" color="green" /> : <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 5 }}>
                    <View style={{ width: SIZES.width * 0.25, height: SIZES.height * 0.18, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 6, borderRadius: SIZES.radius, elevation: 5, marginRight: 15, top: 50 }}>
                        <Text style={{ ...FONTS.h2, textAlign: 'center', fontWeight: 'bold' }}>New Arrival</Text>
                    </View>
                    <FlatList
                        data={product.slice(0, 5)}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <TouchableOpacity style={styles.Viewall}
                        onPress={() => navigation.navigate('ProdList')}>
                        <Text style={{ ...FONTS.h2, textAlign: 'center', fontWeight: 'bold' }}>View All</Text>
                    </TouchableOpacity>
                </ScrollView>}
                <View style={[{ backgroundColor: COLORS.lightGray, height: 50, marginHorizontal: 15, borderRadius: 8, flex: 1, margin: 5, justifyContent: 'center', elevation: 25, alignItems: 'center', flexDirection: 'row' }, styles.shadow]}>

                    <Text style={{ color: COLORS.gray, fontWeight: 'bold', fontSize: 20, paddingHorizontal: 15, textTransform: 'uppercase', letterSpacing: 2 }}>Trending Products</Text>

                </View>

                {isLoading ? <ActivityIndicator size="large" color="green" /> : <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 5 }}>

                    <FlatList
                        data={fproduct.slice(0, 5)}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <TouchableOpacity style={styles.Viewall}
                        onPress={() => navigation.navigate('ProdList')}>
                        <Text style={{ ...FONTS.h2, textAlign: 'center', fontWeight: 'bold' }}>View All</Text>
                    </TouchableOpacity>
                </ScrollView>}
                <View style={[{ backgroundColor: COLORS.white, height: 50, marginHorizontal: 15, borderRadius: 8, flex: 1, margin: 5, justifyContent: 'center', elevation: 25, alignItems: 'center', flexDirection: 'row' }, styles.shadow]}>
                    <FontAwesome name='bookmark' color={COLORS.bgcolor} size={20} />
                    <Text style={{ color: COLORS.gray, fontWeight: 'bold', fontSize: 20, paddingHorizontal: 15, textTransform: 'uppercase', letterSpacing: 2 }}>Budget Buys</Text>
                    <Entypo name='flower' color={COLORS.bgcolor} size={20} />
                </View>
                {isLoading ? <ActivityIndicator size="large" color="green" /> : <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 5 }}>

                    <FlatList
                        data={buproduct.slice(0, 5)}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <TouchableOpacity style={styles.Viewall}
                        onPress={() => navigation.navigate('ProdList')}>
                        <Text style={{ ...FONTS.h2, textAlign: 'center', fontWeight: 'bold' }}>View All</Text>
                    </TouchableOpacity>
                </ScrollView>}
                <View style={[{ backgroundColor: COLORS.lightGray, height: 50, marginHorizontal: 15, borderRadius: 8, flex: 1, margin: 5, justifyContent: 'center', elevation: 25, alignItems: 'center', flexDirection: 'row' }, styles.shadow]}>
                    <Ionicons name='bonfire' color={COLORS.bgcolor} size={20} />
                    <Text style={{ color: COLORS.bgcolor, fontWeight: 'bold', fontSize: 20, paddingHorizontal: 15, textTransform: 'uppercase', letterSpacing: 2 }}>Hot deal products</Text>
                    <Ionicons name='bonfire' color={COLORS.bgcolor} size={20} />
                </View>
                {isLoading ? <ActivityIndicator size="large" color="green" /> : <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 5 }}>

                    <FlatList
                        data={reproduct.slice(0, 5)}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <TouchableOpacity style={styles.Viewall}
                        onPress={() => navigation.navigate('ProdList')}>
                        <Text style={{ ...FONTS.h2, textAlign: 'center', fontWeight: 'bold' }}>View All</Text>
                    </TouchableOpacity>
                </ScrollView>}
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.hContainer}>
                <View style={styles.hbox}>
                    <TouchableOpacity style={[styles.shadow, styles.menuBox]} onPress={() => { navigation.openDrawer(); }}>
                        <Ionicons name='menu' size={30} color={COLORS.white} />
                    </TouchableOpacity>
                    <SearchBox iconType='search' titleText='Search Products' onPress={() => navigation.navigate('Search')} />
                    <TouchableOpacity style={[styles.shadow, styles.searBox]} onPress={() => navigation.navigate('Address')}>
                        <Ionicons name='location' size={22} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {renderBottom()}
            </ScrollView>

            <TouchableOpacity style={{
                width: 60, height: 60, borderRadius: 30,
                justifyContent: 'center', position: 'absolute', bottom: 20, right: 20, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)',
                elevation: 60
            }}
                onPress={() => navigation.navigate('Cart')}>
                <View style={{
                    position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 7, left: 10,
                    width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.primary
                }}>
                    <Text style={{ color: COLORS.white, fontSize: 12, fontWeight: 'bold' }}>{cartCount}</Text>
                </View>
                <Ionicons name='ios-cart' size={22} color='#101010' />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    hContainer: {
        height: 80,
        backgroundColor: COLORS.bgcolor,
        paddingHorizontal:10
    },
    text: {
        color: COLORS.bgcolor,
        fontSize: 25,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: COLORS.lightGray,
        width: '100%',
        height: '100%'
    },
    incBtn: {
        width: 40,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 10
    },
    hbox: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.base,
        maxHeight: 80,
        paddingTop: 25
    },
    Viewall: { width: SIZES.width * 0.36, height: 290, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 6, borderRadius: SIZES.radius, elevation: 5, marginRight: 15, marginTop: 10 },
    shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4.24,
        elevation: 25
    },
    boXShadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 4.24,
        elevation: 5
    },
    menuBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.bgcolor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    searBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    hetxBox: {
        flex: 1,
        padding: SIZES.base,
        paddingLeft: SIZES.base * 2.5
    },
    bodyContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.white,
    },
    DisBox: {
        flex: 1,
        margin: 5,
        flexDirection: 'row',
        backgroundColor: '#ffb499',
        paddingHorizontal: SIZES.base
    },
    errorTextStyle: {
        color: COLORS.bgcolor,
        fontSize: 10
    },
    disText: {
        flex: 1,
        padding: 6
    },
    hImContainer: {
        width: 120,
        height: 90,
    },
    hedImage: {
        width: '100%',
        height: '100%'
    },

    containerpod: {
        flex: 1,
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 10,
        padding: 10
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        borderRadius: 10,
        margin: 10,
        width: 50,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000',
        fontSize: 16,
        padding: 10
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginTop: SIZES.height * 0.35,
        maxHeight: SIZES.height * 0.25,
        margin: 50,
        borderRadius: 10,
        elevation: 20
    },
    option: {
        alignItems: 'center',
        paddingLeft: 15,
        flex: 1,
        width: '100%'
    },
});

//make this component available to the app
export default Home;

