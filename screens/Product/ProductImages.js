//import liraries
import React, {  useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Platform,ScrollView} from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import {Entypo} from 'react-native-vector-icons'
import { color } from 'react-native-reanimated';
// create a component
const ProdImages = ({ route, navigation }) => {
    const [img,setImg]=useState([]);
    const [image,setImage]=useState(null);
   
    React.useEffect(() => {
        let { product } = route.params;
        setImg(product);
    })
    return (
        <View style={styles.container}>
           
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft:5,width:60,height:60}}
            onPress={()=>navigation.goBack()}>
                <Entypo name='cross' size={35} color={COLORS.black}/>
            </TouchableOpacity>
            {
                image ===null ?
                <View style={styles.bImg}>
                        {
                            img.slice(0,1).map((item,index)=>(
                                <Image 
                        source={{uri:item.mi}}
                        resizeMode='contain'
                        style={styles.img}
                    />
                            ))
                        }
                        
            </View>:
            <View style={styles.bImg}>
                        <Image 
                        source={{uri:image}}
                        resizeMode='contain'
                        style={styles.img}
                    />
            </View>
            }
            
            <View style={styles.sep}/>
           
            <View style={styles.butImg}>
            <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {
                img.map((item,index)=>(
                    <TouchableOpacity style={[styles.imgButB,{marginLeft:15}]} onPress={()=>setImage(item.mi)}
                    key={index}>
                        <Image
                            source={{uri:item.mi}}
                            style={{width:'100%',height:'90%'}}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                ))
            }
                    
            </ScrollView>     
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
    bImg:{
        flex:1,
        height:SIZES.height*0.7,
        maxHeight:SIZES.height*0.7,
        marginHorizontal:10,
        width:'95%',
        justifyContent:'center',
        alignItems:'center'
    },
    sep:{
        height:1,
        backgroundColor:COLORS.lgray
    },
    img:{
        width:'80%',
        height:'60%'
    },
    butImg:{
        flex:1,
        flexDirection:'row',
        height: Platform.OS==='ios'?120:130,
        maxHeight:SIZES.height*0.15,
        alignItems:'center'
    },
    imgButB:{
        width:80,height:80,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:8,
        borderWidth:1,
        borderRadius:10,
        borderColor:COLORS.gray
    }
});

//make this component available to the app
export default ProdImages;
