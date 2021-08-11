//import liraries
import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet,ScrollView,FlatList } from 'react-native';
import { COLORS,SIZES,FONTS} from './../../constants/theme';
import HeaderBar from '../../components/HeaderBar';
import { Ionicons, Entypo, FontAwesome, AntDesign } from 'react-native-vector-icons'
// create a component
const CustomerReview = ({ route, navigation }) => {
    const [rating,setRating]=useState('');
    useEffect(() => {
        let { userRatData } = route.params;        
        setRating(userRatData);
    })
    return (
        <ScrollView style={styles.container}>
            <HeaderBar titleText='User Review' onPress={() => navigation.goBack()} />
            <View style={{flex:1,backgroundColor:COLORS.white}}>
                <FlatList
                    data={rating}
                    keyExtractor={item=>item.id}
                    renderItem={({item,index})=>(
                        <View style={[styles.card,{marginBottom:index == rating.length - 1 ? 60 : 2 }]} key={index}>
                            <Text style={{fontSize:16,color:COLORS.black,marginLeft:10,textTransform:'capitalize',
                            letterSpacing:2}}>{item.firstname}{' '}{item.lastname} {' '} - ({item.date})</Text>
                            <Text style={{ padding: 1, paddingHorizontal: SIZES.radius, backgroundColor: COLORS.bgcolor, 
                            marginLeft:15, borderRadius: SIZES.radius, color: COLORS.white, 
                             alignItems: 'center',width:45, fontSize: 11,marginVertical:4}}>
                            {item.rating}{' '}<Ionicons name='star' size={SIZES.body4} color={COLORS.white} />
                            </Text> 
                            <Text style={{fontSize:14,fontWeight:'bold',color:COLORS.gray,marginLeft:10,textTransform:'capitalize'}}>{item.comment} </Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop:40,
        paddingBottom:130
    },
    card:{
        flex:1,
        margin:5,
        marginHorizontal:10,
        padding:10,
        borderRadius:10,
        backgroundColor:COLORS.white,
        elevation:15,
        shadowColor:COLORS.darkgray,
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.45,
        shadowRadius:3.85
    }
});

//make this component available to the app
export default CustomerReview;
