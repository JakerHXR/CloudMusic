import React from "react";
import getStyle from "./Style/MyViewStyle";
import Img from "./Img/Image";
import { ListItem } from '@rneui/themed';
import {BackgroundImage} from "react-native-elements/dist/config";
import {Dimensions, Image, ImageBackground, Text, View} from "react-native";
import {Avatar, Icon} from "react-native-elements";

let styles = getStyle()
export default function MyView(){
    const name = "CloudMusic"
    const subName = "lv.6"
    return(
        <BackgroundImage source={Img.back} style={{height:Dimensions.get("window").height}}>
        <View style={{flex:1}}>

            {/*    <View style={{flexDirection:"row",marginHorizontal:60,justifyContent:'space-between'}}>*/}
                <View>
                    <ListItem>
                        <Avatar source={Img.logo}/>
                        <ListItem.Content>
                            <ListItem.Title style = {{color:'black',fontsize:12,paddingVertical:4}} right='true'>{name}</ListItem.Title>
                            <ListItem.Subtitle style = {{color:'black',fontsize:12}}>{subName}</ListItem.Subtitle>
                            <Text style={{fontSize:12, color:'black'}}>
                                开通黑胶VIP >
                            </Text>
                        </ListItem.Content>
                    </ListItem>
                    {/*<Image source={Img.logo} style={{width:60,height:60}} resizeMode={"contain"}/>*/}
                    {/*<Text style={{color:'white',fontSize:12}}>{name}</Text>*/}
                    {/*<Text style={{color:'white',fontSize:8}}>{subName}</Text>*/}
                </View>


        </View>
        </BackgroundImage>
    )
}