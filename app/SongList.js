import React, {useEffect, useState} from "react";
import axios from "axios";
import {Avatar, Header, Icon, ListItem} from "react-native-elements";
import {ScrollView, Text, View} from "react-native";
import getStyle from "./Style/SongListStyle";
import * as Linking from 'expo-linking';


// import {createNativeStackNavigator} from "@react-navigation/native-stack";
 import PlaySongView from "@/app/PlaySongView";
import {useNavigation} from "@react-navigation/native";
// const PlayMusic = new createNativeStackNavigator({
//     initialRouteName: SongList,
//     screens: {
//         SongList: SongList,
//         PlaySongView: PlaySongView
//     }
//
// })
let styles =[]
export default function SongList(){
    const navigation = useNavigation()
    const [songs,setSongs] = useState()
    useEffect(()=>{
        //http://192.168.18.169:8080/song
        //http://localhost:8080/song
        fetch('http://localhost:8080/song',{
            method:'GET',
            headers:{
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            console.log(response)
            return response.json()})
            .then(responseJson => {
                console.log(responseJson)
                setSongs(responseJson)
            }).catch(error => console.log(error))
        setSongs(songs)
    },[])
   // function getSongs() {
        //
        //     const fetchData = async () => {
        //         try {
        //             await fetch('http://localhost:8080/song',{
        //                 method:'GET',
        //                 headers:{
        //                     Accept: 'application/json',
        //                     "Content-Type": 'application/json'
        //                 }
        //             }).then((response) => {
        //                 console.log(response)
        //                 return response.json()})
        //                 .then(responseJson => {
        //                     console.log(responseJson)
        //                     setSongs(responseJson)
        //                 })
        //             setSongs(result)
        //         }catch {
        //             console.log('连接服务器失败')
        //             return (
        //                 <View>
        //                     <Text>连接服务器失败</Text>
        //                 </View>
        //             )
        //         }
        //
        //     }
        //     fetchData()
        // }
    //
    console.log(songs)
    function goPlay(item){
        navigation.navigate('SongView', {id: item.id, name: item.name})
    }

    function renderItem (item, index) {
        console.log(item)
        return(
            <ListItem
                onPress={()=>goPlay(item)}
                key={index}
            >
                <Avatar rounded source={{uri: item.imgUrl}}/>
                <ListItem.Content>
                    <ListItem.Title style={{fontSize: 14, paddingVertical:2}}>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }

    styles  =getStyle()
    return (
        <View>
            <Header
                containerStyle={styles.headerContainer}
                placement="left"
                leftComponent={
                    <Icon
                        name='arrowleft'
                        type='antdesign'
                        color='black'
                        // onPress={() =>{
                        //     this.props.navigation.goBack()
                        // }}
                    />
                }
                centerComponent={{ text: '您的歌曲', style: { color: 'black', fontSize: 16 } }}
            />
            <ScrollView style={{marginBottom: 60}}>
                {
                    songs&&
                    songs.map((item, index)=>{
                        return renderItem(item, index)
                    })
                }
            </ScrollView>
            {/*<Text>this is test</Text>*/}
        </View>
    )
}