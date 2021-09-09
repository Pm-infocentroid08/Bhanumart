//import liraries
import React, { useEffect,useState,createRef } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,TextInput,Alert} from 'react-native';
import { COLORS, SIZES } from './../../constants/theme';
import HeaderBar from '../../components/HeaderBar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../Loader';
import { BASE_URL } from './../../Base';
// create a component
const RatingS = ({route,navigation}) => {
    const [product, setProduct] = useState(null);
    const [rat,setRat]=useState(2.5);
    const [comment,setComment]= useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    
    const [
        isRatingSubmitSuccess,
        setIsRatingSubmitSuccess
    ] = useState(false);
    const userInfo = useSelector(state => state.users);
    const commentInputRef = createRef();

    useEffect(() => {
        let { product } = route.params;

        setProduct(product)
    })

    const submitRating=()=>{
        setErrortext('');
        if (!comment) {
            Alert.alert('Please Write comment');
            return;
        }
        setLoading(true);
        const myHeaders = new Headers();
        
        const formdata = new FormData();
        formdata.append("user_id", userInfo);
        formdata.append("product_id", product?.id);
        formdata.append("rating", rat);
        formdata.append("comment",comment);
        
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(BASE_URL+"reviews", requestOptions)
          .then(response => response.json())
          .then(result => {
            setLoading(false);
              if(result.responce===true){
                setIsRatingSubmitSuccess(true);
              }else{
                setErrortext(result.massage)
              }
          })
          .catch(error =>{
            setLoading(false);
            console.log('error', error)
          } );
    }
    if (isRatingSubmitSuccess) {
        return (<View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Image
                source={{uri:'https://www.designfreelogoonline.com/wp-content/uploads/2016/12/000784-5-stars-logo-design-online-free-3d-logo-maker-03.png'}}
                resizeMode='contain'
                style={{ width: 200, height: SIZES.height*0.4}}
            />
                <Text style={[styles.successTextStyle,{fontSize:20,color:'green',fontWeight:'bold',paddingBottom:20}]}>
                Thank you for your support
            </Text>
            <Text style={styles.successTextStyle}>
                Your  Rating  Submit Successful
            </Text>
            <Text style={styles.textSu}>
               Continue Shopping
            </Text>
            </View>
            
            <View style={{height:150}}>
            <TouchableOpacity style={{backgroundColor:COLORS.darkgray,padding:10,borderRadius:10,paddingHorizontal:18}}
            onPress={()=>navigation.navigate('Home')}>
                <Text style={{color:COLORS.white,fontWeight:'bold'}}>Shop Now</Text>
            </TouchableOpacity>
            </View>
            
                <Text style={{color:COLORS.red,fontWeight:'bold',fontSize:20,marginVertical:6}}>{errortext}</Text>
        </View>)
    }
    return (
        <View style={styles.container}>
            <HeaderBar titleText='Rating & Reviews' onPress={() => navigation.goBack()} />
            <Loader loading={loading} />
            <Image
                source={{uri:product?.image}}
                resizeMode='contain'
                style={{
                    width:'100%',
                    height:120,
                    alignSelf:'center',
                    marginVertical:5
                }}
            />
            <Text style={{marginVertical:6,textAlign:'center',fontSize:16}}>{product?.product_name}</Text>
            <View style={styles.sepreator}/>

            <View>
                <Rating
                    onFinishRating={(rating)=>{
                        setRat(rating)
                    }}
                    style={{
                        padding:20
                    }}
                />
                <Text style={{textAlign:'center',fontSize:20,color:COLORS.gray,fontWeight:'bold'}}>{rat} / 5 Ratings</Text>
                <View style={styles.SectionStyle}>
                <TextInput
                        style={[styles.inputStyle, { marginRight: 5 }]}
                        onChangeText={(e) => setComment(e)}
                        placeholder="Enter Your Comment"
                        placeholderTextColor={COLORS.gray}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            commentInputRef.current && commentInputRef.current.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                
                 
                <View style={{flex:1,height:60,justifyContent:'center',marginTop:40,padding:10}}>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginHorizontal:15,backgroundColor:COLORS.darkgray,borderRadius:8,height:40}}
                    onPress={submitRating}>
                        <Text style={{color:COLORS.white,fontWeight:'bold',textTransform:'uppercase',letterSpacing:2}}>Submit</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop:40
    },
    sepreator: {
        flex: 1,
        width: '100%',
        height: 1,
        maxHeight:1,
        backgroundColor: COLORS.bgcolor
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 50,
        marginTop: 20,
        marginLeft: 25,
        marginRight: 25,
        margin: 10,
      },
    inputStyle: {
        flex: 1,
        color: COLORS.gray,
        paddingLeft: 20,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.gray,
      },
});

//make this component available to the app
export default RatingS;
