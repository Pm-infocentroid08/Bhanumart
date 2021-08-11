//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid,FlatList, SafeAreaView, ScrollView, Image, 
    ActivityIndicator,ImageBackground,Platform} from 'react-native';
import HeaderBar from '../../components/HeaderBar/index';
import { SIZES, COLORS, FONTS } from '../../constants/index'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome, Ionicons } from 'react-native-vector-icons'
import ShoppingCartIcon from '../../components/ShoppingCartIcon';
import { showMessage } from "react-native-flash-message";
import { Picker as SelectPicker } from '@react-native-picker/picker'
import WishlistIcon from './../../components/WishlistIcon';

// create a component

const SimilarProduct = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [qty, setQty] = useState(1);
    const [mdata, setMdata] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [isOpen,setIsOpen] = useState(false);
    const userInfo = useSelector(state => state.users)
    
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
    const getFProduct = (id, caid, sid) => {
        const myHeadersp = new Headers();
        const formdatap = new FormData();
        formdatap.append("product_type_id", id);
        formdatap.append("category_id", caid);
        formdatap.append("subcategory_id", sid);

        const requestOptionsp = {
            method: 'POST',
            headers: myHeadersp,
            body: formdatap,
            redirect: 'follow'
        };
        fetch("https://bhanumart.vitsol.in/api/get_product", requestOptionsp)
            .then(response => response.json())
            .then(result => { setData(result.data), setMdata(result.data) })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    useEffect(() => {
        let { product } = route.params;
        getFProduct(product.product_type,product.category_id,product.subcategory_id);
        getCartProduct();
    }, []);

    
    const add_cart = (item) => {
        if(item.id===selectedValue.product_id){
            
            const myHeadersadd = new Headers();
            const formdataadd = new FormData();
            formdataadd.append("user_id", userInfo);
            formdataadd.append("product_id", item.id);
            formdataadd.append("product_name", item.product_name);
            formdataadd.append("price",item.varients[0].sale_price);
            formdataadd.append("qty", qty);
            formdataadd.append("variant_id",selectedValue.id);
    
    
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
                        showToastWithGravity('Added to Cart');
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch(error => console.log('error', error));
        }else{
           
            const myHeadersadd = new Headers();
            const formdataadd = new FormData();
            formdataadd.append("user_id", userInfo);
            formdataadd.append("product_id", item.id);
            formdataadd.append("product_name", item.product_name);
            formdataadd.append("price", item.varients[0].sale_price);
            formdataadd.append("qty", qty);
            formdataadd.append("variant_id",item.varients[0].id);
    
    
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
                        showToastWithGravity('Added to Cart');
                        getCartProduct();
                    } else {
                        setErrortext(responseJson.massage);
                        Alert.alert(responseJson.massage);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }


    const renderItem = ({ item }) => (
        <View key={item.id}>
            <View style={styles.containerbo} >
                <View style={styles.left}>
                <View style={[styles.imgBox, styles.shadow]}
                    onPress={() => navigation.navigate('ProductDetail', { item })}>
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
                                    </View>  : 
                                    <View >
                                    {
                                        item.varients.length < 2 ?
                                            <View>
                                            {
                                                item.varients[0].image.slice(0,1).map(item=>(
                                                    <View style={[styles.imgBox, styles.shadow]}>
                                                {
                                                        item !== ''||undefined ?
                                                <Image
                                                    source={{ uri: item.mi }}
                                                    resizeMode='contain'
                                                    style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                />:
                                                <Image
                                                    source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
                                                    resizeMode='contain'
                                                    style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                />
                                                }
                                            </View>
                                                ))
                                            }                                               
                                            </View>:
                                            <View>
                                            {
                                    selectedValue.product_id === item.id ?
                                    <View>
                                    {
                                        selectedValue.image.slice(0,1).map(item=>(
                                            <View style={[styles.imgBox, styles.shadow]}>
                                                {
                                                        item !== ''||undefined ?
                                                <Image
                                                    source={{ uri: item.mi }}
                                                    resizeMode='contain'
                                                    style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                />:
                                                <Image
                                                    source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
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
                                                item.varients[0].image.slice(0,1).map(item=>(
                                                    <View style={[styles.imgBox, styles.shadow]}> 
                                                {
                                                        item !== ''||undefined ?
                                                <Image
                                                    source={{ uri: item.mi }}
                                                    resizeMode='contain'
                                                    style={{ width: '100%', height: '100%', borderRadius: SIZES.base }}
                                                />:
                                                <Image
                                                    source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_nkjk3ZfgDytXi0IAHbpW1PnkEf8TpGwsQ2FnEzoWLc7_Z5VFQnN86GJX1drBJh7ysY&usqp=CAU' }}
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
                      
                    </View>
                </View>
                <View style={styles.right}>
                    <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.black, paddingVertical: 6 }}>{item.product_name}</Text>
                    {
                    item.rating ? <Text style={{ padding: SIZES.base * 0.06, backgroundColor: '#ffece6', width: 40, borderRadius: SIZES.base, textAlign: 'center',fontSize:12 ,color:COLORS.bgcolor}}>{item.rating||0}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.bgcolor} /></Text>:<View/>
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
                                            style={{ height: 30,  borderRadius: 10,backgroundColor:COLORS.white }}
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
                              selectedValue.product_id===item.id?
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


                                </View>:
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
                
                    
                    <View style={{ flexDirection: 'row', flex:1,justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            
                            <TouchableOpacity
                                style={{
                                   height: 30,
                                    borderRadius: 10, justifyContent: 'center',
                                    alignItems: 'center', backgroundColor: COLORS.bgcolor,
                                    marginRight: SIZES.base,
                                    paddingHorizontal:20,
                                }}
                                onPress={() => {
                                    add_cart(item)
                                }}
                            >
                                <Text style={{color:COLORS.white,fontWeight:'bold'}}>Add</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
            <View style={styles.seperator} />
        </View>
    )
    function renderDetails() {
        return (
            <View style={styles.containerBox}>

                <View style={{ flex: 1, width: SIZES.width, padding: 10 }}>
                    {isLoading ? <ActivityIndicator size="large" color="orange" /> : <FlatList
                        data={data}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                    />}
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.container, { marginTop: 40 }]}>
            <HeaderBar titleText='Store' onPress={() => navigation.goBack()} />
           <View style={[styles.seperator,{backgroundColor:COLORS.lgray}]} />
            <ScrollView style={styles.container}>
                {renderDetails()}
            </ScrollView>
            <View style={{ position: 'absolute', top: 20, right: 50, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20 }}>
                <WishlistIcon/>
            </View>
            <View style={{ position: 'absolute', top: 20, right: 10, alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 20 }}>
                <ShoppingCartIcon cartCount={cartCount}/>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    containerBox: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: COLORS.bgcolor,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.89,
        elevation: 6
    },
    box: {
        paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center',
        backgroundColor: COLORS.white, borderWidth: 1,
        borderColor: COLORS.gray, borderRadius: SIZES.base,
        marginHorizontal: 6, height: 30
    },
    textB: {
        ...FONTS.h3,
        fontWeight: 'bold',
        color: COLORS.gray
    },
    headerSta: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'space-between',
        alignItems: 'center', borderRadius: 10
    },
    containerbo: {
        flex: 1,
        flexDirection: 'row',
        padding: 1,
        marginTop:-18
    },
    left: {
        width: 140,
        padding: 10,
        paddingTop:40,
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
    shadow: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.35,
        elevation: 5
    }
});

//make this component available to the app
export default SimilarProduct;
