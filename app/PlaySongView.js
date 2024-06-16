import React, {useState} from "react";
import {Sound} from "expo-av/build/Audio/Sound";
import axios from "axios";
import Lyric from "lyric-parser/src";
import {ImageBackground, ScrollView, TouchableOpacity, View} from "react-native";
import {Header, Icon, Slider} from "react-native-elements";
import Img from './Img/Image'
import getStyle from "./Style/PlaySongStyle";
import {secondsFormat} from "./Tool";
import {useNavigation} from "@react-navigation/native";

let styles = getStyle()


export default function PlaySongView({navigation}){

   const [song, setSong] = useState(getSong)
   // const [play,setPlay] = useState(true)
   const [id, setId] = useState(navigation.state.params.id)
   // const [name, setName] = useState(navigation.state.params.name)
   // const [progress, setProgress] = useState(0)
   // const [duration, setDuration] = useState(0)
   // const [lyric, setLyric] = useState([])
   // const [lineNum, setLineNum] = useState(0)
   const [lyricHeight, setLyricHeight] = useState(35)

   const fetchLyric = async() => {
      const result1 = await axios(`http://localhost:8080/lyric?id=${id}`)
      return new Lyric(result1.data.lyric, handler).lines
   }
   setLyric(fetchLyric())

   function getSong() {
      const fetchSong = async() => {
         const result2 = await axios(`http://localhost:8080/song/url?id=${id}`)
         console.log(result2.data)
         const {sound}= Sound.createAsync(result2.data.data[0].url)
         setSong(sound)
      }
      fetchSong()
   }


   function handler({lineNum,txt}) {
      setLineNum(lineNum)
      this.scrollView.scrollTo({
         y: lyricHeight * lineNum,
         animated: true
      })
   }

   // const slideStart = () =>{
   //    clearInterval(this.time)
   // }
   //
   //
   // const pauseMusic = () => {
   //    song.pauseAsync()
   // }
   //
   // const  playMusic = () => {
   //    song.playAsync()
   // }

   return(
       <View>
       <ImageBackground style={styles.container} source={Img.back}>

          {/*/!*头部*!/*/}
          {/*<Header*/}
          {/*    containerStyle={styles.headerContainer}*/}
          {/*    placement="left"*/}
          {/*    leftComponent={*/}
          {/*       <Icon*/}
          {/*           name='arrowleft'*/}
          {/*           type='antdesign'*/}
          {/*           color='black'*/}
          {/*           onPress={() =>{*/}
          {/*             // this.props.navigation.goBack()*/}
          {/*           }}*/}
          {/*       />*/}
          {/*    }*/}
          {/*    centerComponent={{ text: this.state.title, style: { color: 'black', fontSize: 16 } }}*/}
          {/*/>*/}
          {/*<View style={styles.contentContainer}>*/}

          {/*   /!*歌词显示*!/*/}
          {/*   <View style={styles.topView}>*/}
          {/*      {*/}
          {/*          this.state.lyric.length !==0 &&*/}
          {/*          <ScrollView ref={(ref)=>this.scrollView=ref}>*/}
          {/*             /!*占位*!/*/}
          {/*             <View style={styles.blockView}/>*/}
          {/*             {*/}
          {/*                this.state.lyric.map((item, index)=>{*/}
          {/*                   return(*/}
          {/*                       <Text key={index} style={[styles.lyricText, this.state.lineNum === index ? styles.lyricTextActive: styles.lyricTextNormal]}>*/}
          {/*                          {item.txt}*/}
          {/*                       </Text>*/}
          {/*                   )*/}
          {/*                })*/}
          {/*             }*/}
          {/*             /!*占位*!/*/}
          {/*             <View style={styles.blockView}/>*/}
          {/*          </ScrollView>*/}
          {/*      }*/}
          {/*   </View>*/}

          {/*   /!*底部工具*!/*/}
          {/*   <View style={styles.bottomView}>*/}
          {/*      <View></View>*/}
          {/*      <View style={styles.bottomView_center}>*/}
          {/*         <Text style={styles.timeText}>{secondsFormat(this.state.seconds)}</Text>*/}
          {/*         <Slider*/}
          {/*             maximumValue={100}*/}
          {/*             step={1}*/}
          {/*             style={styles.slideContainer}*/}
          {/*             value={this.state.progress}*/}
          {/*             onValueChange={this.changeSeconds}*/}
          {/*             onSlidingComplete={this.changeProgress}*/}
          {/*             onSlidingStart={this.slideStart}*/}
          {/*         />*/}
          {/*         <Text style={styles.timeText}>{secondsFormat(this.state.duration)}</Text>*/}
          {/*      </View>*/}
          {/*      <View style={styles.bottomView_bottom}>*/}
          {/*         <Icon*/}
          {/*             name='loop'*/}
          {/*             type='entypo'*/}
          {/*             color='white'*/}
          {/*             onPress={() =>{*/}
          {/*                this.props.navigation.goBack()*/}
          {/*             }}*/}
          {/*         />*/}
          {/*         <Icon*/}
          {/*             name='stepbackward'*/}
          {/*             type='antdesign'*/}
          {/*             color='white'*/}
          {/*             onPress={() =>{*/}
          {/*                this.props.navigation.goBack()*/}
          {/*             }}*/}
          {/*         />*/}

          {/*         /!*播放控制按钮*!/*/}
          {/*         <TouchableOpacity onPress={()=>{*/}
          {/*            setPlay(!play)*/}
          {/*            if (play){*/}
          {/*               playMusic()*/}
          {/*           }else{*/}
          {/*               pauseMusic()*/}
          {/*            }*/}
          {/*            //lyric.togglePlay()*/}
          {/*         }}>*/}
          {/*            <Icon*/}
          {/*                name={play?'play':'pausecircle'}*/}
          {/*                type='antdesign'*/}
          {/*                color='white'*/}
          {/*            />*/}
          {/*         </TouchableOpacity>*/}

          {/*         <Icon*/}
          {/*             name='stepforward'*/}
          {/*             type='antdesign'*/}
          {/*             color='white'*/}
          {/*             onPress={() =>{*/}
          {/*                //navigation.goBack('SongList')*/}
          {/*             }}*/}
          {/*         />*/}
          {/*         <Icon*/}
          {/*             name='menufold'*/}
          {/*             type='antdesign'*/}
          {/*             color='white'*/}
          {/*             onPress={() =>{*/}
          {/*                //navigation.goBack('SongList')*/}
          {/*             }}*/}
          {/*         />*/}
          {/*      </View>*/}
          {/*   </View>*/}
          {/*</View>*/}

       </ImageBackground>
       </View>
   )
}