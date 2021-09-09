//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES, images } from '../../constants/index'
import { Ionicons, FontAwesome } from 'react-native-vector-icons'
import HeaderBar from './../../components/HeaderBar/index';

import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from './../../Base';
// create a component
const ListItem = ({ titleText, image, id, ...rest }) => {
    const [show, setShow] = React.useState(null);
    const [isLoading, setLoading] = useState(true);
    const [datac, setDatac] = React.useState([]);
    const navigation =useNavigation();
    const getCategory = () => {
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("product_type_id", id);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
          fetch(BASE_URL+"get_category", requestOptions)
            .then(response => response.json())
            .then(result => setDatac(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    useEffect(() => {

        getCategory();

    }, [1500])
    return (
        <View>
            <TouchableOpacity style={styles.ListBox} onPress={() => setShow(!show)}>

                <View style={styles.iconBox}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: 35,
                            height: 35
                        }}
                    />
                </View>
                <Text style={{ ...FONTS.h2, fontWeight: 'bold', paddingLeft: SIZES.base, color: COLORS.black }}>{titleText}</Text>
                <TouchableOpacity >
                    <Ionicons name='caret-forward' size={SIZES.padding} color={COLORS.gray} />
                </TouchableOpacity>

            </TouchableOpacity>
            {
                show ? (
                    <View>
                    {isLoading ? <ActivityIndicator size="large" color="orange" /> :<View>
                    {datac!==undefined ? <View>
                        {datac.map(item=>(
                        <View>
                        <TouchableOpacity onPress={() => navigation.navigate('SubCategory',{item})}>
                                <Text style={styles.subtitle}>{item.category}</Text>
                            </TouchableOpacity><View style={styles.seperator} />
                        </View>
                       ))} 
                    </View>:<View>
                    <Text style={styles.subtitle}>No Subcategory yet</Text>
                    </View>}
                       
                       </View>  }
                    </View>
                ) : null
            }
            <View style={styles.seperator} />
        </View>
    )
}
const ShopbyCategory = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = React.useState([]);
    const getCategory = () => {
        const myHeaders = new Headers();
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
        fetch(BASE_URL+"get_product_type", requestOptions)
            .then(response => response.json())
            .then(result => setData(result.data))
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }
    useEffect(() => {

        getCategory();

    }, [1500])
    function renderData() {

        return (
            <View style={styles.wcontainer}>
                {isLoading ? <ActivityIndicator size="large" color="orange" /> :
                    <View>
                        {data.map(item => (
                            <ListItem titleText={item.product_type} image={item.image} id={item.id}
                                 key={item.id}
                            />
                        ))}
                    </View>}


            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.container, { marginTop: 40 }]}>
            <HeaderBar titleText='Shop By Category' onPress={() => navigation.goBack()} />
            <ScrollView style={[styles.container,{marginTop:-20}]} showsVerticalScrollIndicator={false}>
                {renderData()}
            </ScrollView>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    wcontainer: {
        flex: 1,
        padding: 10,
        marginVertical: 10
    },

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
    ListBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        margin: 5,
        padding: 10,
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.bgcolor
    },
    hBox: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.base
    },
    subtitle: {
        padding: 10,
        color: COLORS.gray, ...FONTS.h3,
        textAlign: 'center'
    }
});

//make this component available to the app
export default ShopbyCategory;
