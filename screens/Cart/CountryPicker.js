import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, Platform, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { COLORS } from './../../constants/theme';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ModalPicker = (props) => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState([])
   
    const getCountry = () => {
        const myHeaders = new Headers();

        const formdata = new FormData();
        formdata.append("country_id", "1");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://bhanumart.vitsol.in/api/get_state_by_country_id", requestOptions)
            .then((response) => response.json())
            .then(result => {
                if (result.responce === true) {
                    setName(result.data)
                } else {
                    setName(0)
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => setLoading(false))
            .finally(setLoading.bind(undefined, false));
    }

    useEffect(() => {

        getCountry();

    }, [])
    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.option}
            key={item.id}
            onPress={() => onPressItem(item.id)}>
            <Text style={styles.text}>{item.state}</Text>
        </TouchableOpacity>
    )



    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}>
            {loading ? <ActivityIndicator size="large" color="orange" /> : <View style={[styles.modal, { width: WIDTH - 20, height: HEIGHT / 2 }]}>
                <ScrollView>
                    <FlatList
                        data={name}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        ItemSeparatorComponent= {()=> <View style={{height:0.5, backgroundColor:'#34495e90'}}/> }
                    />
                </ScrollView>
            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
        alignItems: 'center',
        width:'100%'
    },
    option: {
        alignItems: 'center',
        paddingLeft: 15,
        flex:1,
        width:'100%'
    },
    text: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export { ModalPicker };