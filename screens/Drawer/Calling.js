import React from 'react'
import {View,Text,SafeAreaView,TouchableOpacity,Image,FlatList,ScrollView,Dimensions} from 'react-native'
import {Ionicons,Feather} from 'react-native-vector-icons';

const CallIng = ({navigation}) => {
    
    function renderBody(){
        return(
            <View style={{alignItems:'center',paddingVertical:40}}>
            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',marginTop:16,marginBottom:25,color:'#eb4034'}}>Calling....</Text>
                <View  style={{
                        width:146,
                        height:146,
                        borderRadius:73,
                        elevation:6,
                        backgroundColor:'#f7f7f7',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                <Image 
                source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9uex3bdfPN81jHXHVXG7wTA37w9mcz1rRw&usqp=CAU"}}
                    style={{
                        width:140,
                        height:140,
                        borderRadius:70
                    }}
                />
                </View>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',marginTop:25}}>Krunal</Text>

                <View style={{padding:10,margin:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',margin:25}}
                        onPress={()=>{}}>
                            <Ionicons name='mic-off' size={28} color={'#000'}/>                        
                        </TouchableOpacity>
                        <Text>Mute</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',margin:25}}
                        onPress={()=>{}}>
                            <Ionicons name='apps' size={28} color={'#000'}/>                        
                        </TouchableOpacity>
                        <Text>Keypad</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',margin:25}}
                        onPress={()=>{}}>
                            <Ionicons name='volume-high' size={28} color={'#000'}/>                        
                        </TouchableOpacity>
                        <Text>Speaker</Text>
                    </View>
                   
                </View>
                <View style={{padding:10,margin:10,flexDirection:'row',justifyContent:'space-between',marginTop:-20}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',margin:25}}
                        onPress={()=>{}}>
                            <Ionicons name='ios-add' size={28} color={'#000'}/>
                        </TouchableOpacity>
                        <Text>Add Call</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',margin:25}}
                        onPress={()=>{}}>
                            <Ionicons name='videocam' size={28} color={'#000'}/>                           
                        </TouchableOpacity>
                        <Text>Video Call</Text>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style={{width:60,height:60,borderRadius:30,backgroundColor:'#f7f7f7',elevation:5,alignItems:'center',justifyContent:'center',margin:25}}
                        onPress={()=>{}}>
                            <Ionicons name='ios-person' size={28} color={'#000'}/>                           
                        </TouchableOpacity>
                        <Text>Contacts</Text>
                    </View>
                </View>
                <TouchableOpacity 
                style={{
                    width:80,
                    height:80,
                    borderRadius:40,
                    justifyContent:'center',
                    alignItems:'center',
                    margin:10,
                    backgroundColor:"#f9f9f9",
                    elevation:8
                }}>
                    <Feather name='phone-call' size={35} color='#eb4034' style={{ justifyContent:'center',
                    alignItems:'center'}}/>
                </TouchableOpacity>
            </View>
        )
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                
                {renderBody()}
            </ScrollView>            
        </SafeAreaView>
    )
}

export default CallIng;


