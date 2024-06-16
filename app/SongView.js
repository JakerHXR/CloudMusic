import React, {useEffect, useState} from "react";
import Img from "./Img/Image"
import getStyle from "./Style/PlaySongStyle";
import {ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {BackgroundImage} from "react-native-elements/dist/config";
import {Header, Icon, Slider} from "react-native-elements";
import axios from "axios";
import Lyric from "lyric-parser/src";
import {secondsFormat} from "@/app/Tool";
import {Audio} from "expo-av";
import {color} from "@rneui/base";
import {loaded} from "expo-font/build/memory";
let styles = getStyle()
export default function SongView({route,navigation}){
    const {id,name} = route.params
    const [play, setPlay] = useState(true)
    const [songName,setSongName] = useState(name)
    const [seconds,setSeconds] = useState(0)
    const [duration,setDuration] = useState(300)
    const [progress,setProgress] = useState(0)
    const [sound, setSound] = useState(new Audio.Sound())
    const [lyric, setLyric] = useState([])
    const [lineNum, setLineNum] = useState(0)
    const [lyricHeight, setLyricHeight] = useState(35)
    const [loaded, setLoaded] = useState(false)

    // useEffect(()=>{
    //
    // })
    // function getSong() {
    //     const fetchSong = async() => {
    //         const result2 = await axios(`http://localhost:8080/song/url?id=${id}`)
    //         console.log(result2.data)
    //         const {sound}= Sound.createAsync({uri:result2.data.url},{shouldPlay:true})
    //         setSong(sound)
    //         await sound.playAsync()
    //     }
    //     fetchSong()
    // }
    const pauseMusic = () => {
        if (sound !== null){
            sound.pauseAsync()
            console.log(sound.getStatusAsync().then((result)=>{
                setLoaded(result.isLoaded)
                console.log(result)}))
        }

    }

    const  playMusic = () => {
        if (sound!==null) {
            sound.playAsync()
            console.log(sound.getStatusAsync())
        }

    }

    useEffect(()=>{
        if (loaded === true) {
            sound.unloadAsync()
        }
        const fetchSong = async() => {
            //http://192.168.18.169:8080/song/url?id=${id}
            //http://localhost:8080/song/url?id=${id}
            const result2 = await axios(`http://localhost:8080/song/url?id=${id}`)
            console.log(result2.data)
            // const {sound}= await Audio.Sound.createAsync({uri:result2.data.url})
            if (loaded === false){
                await sound.loadAsync({uri: result2.data.url})
            }
            sound.getStatusAsync().then((result)=>{
                setDuration(result.durationMillis/1000)
            })
            console.log(sound)
            //await sound.playAsync()
        }
        fetchSong()
        console.log(sound)
        const fetchLyric = async() => {
            //http://192.168.18.169:8080/lyric?id=${id}
            //http://localhost:8080/lyric?id=${id}
            const result1 = await axios(`http://localhost:8080/lyric?id=${id}`)
            console.log(result1)
            const lyrics = result1.data.split('\r\n');
            console.log(lyrics)
            //const  lyrics = new Lyric(result1.data, handler).lines
            setLyric(lyrics)
        }
        fetchLyric()
    },[])
    // function getLyrics(){
    //     const fetchLyric = async() => {
    //         const result1 = await axios(`http://localhost:8080/lyric?id=${id}`)
    //         console.log(result1)
    //         const  lyrics = new Lyric(result1.data, handler).lines
    //         setLyric(lyrics)
    //     }
    //     fetchLyric()
    // }


    // function handler({lineNum,txt}) {
    //     setLineNum(lineNum)
    //     this.scrollView.scrollTo({
    //         y: lyricHeight * lineNum,
    //         animated: true
    //     })
    // }

    const freshProgress=()=>{
        sound.getStatusAsync().then((result)=>{
            setSeconds(result.positionMillis/1000)
        })
    }


    const slideStart=()=>{
        clearInterval(this.time)
    }

    const changeSeconds=(progress)=>{
        setProgress(progress)
        let seconds = Math.floor((progress/100)*duration)
        setSeconds(seconds)
    }

    //TODO 进度条滑动到最后时
    const changeProgress=()=>{

        if(seconds >= this.state.duration -10){

        }else{
            this.song.setCurrentTime(this.state.seconds)
            this.lyric.seek(this.state.seconds*1000)
        }


        //使用定时器去刷新进度
        this.time = setInterval(()=>{
            this.freshProgress()
        }, 10)
    }


    return(
        <View>
            <ImageBackground source={Img.back} style={styles.container}>
                {/*头部*/}
                <Header
                    containerStyle={styles.headerContainer}
                    placement="left"
                    leftComponent={
                       <Icon
                           name='arrowleft'
                           type='antdesign'
                           color='black'
                           onPress={() =>{
                             navigation.goBack()
                           }}
                       />
                    }
                    centerComponent={{ text: songName, style: { color: 'black', fontSize: 16 } }}
                />
                {/*<View style={styles.headerContainer}>*/}
                {/*    <Icon*/}
                {/*        name='arrowleft'*/}
                {/*        type='antdesign'*/}
                {/*        color='black'*/}
                {/*        onPress={() =>{*/}
                {/*            // this.props.navigation.goBack()*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <Text style={{color:'black',fontSize:16}}>{songName}</Text>*/}
                {/*</View>*/}

                {/*   /!*歌词显示*!/*/}
                   <View style={styles.topView}>
                      {
                          // lyric.length !==0 &&ref={(ref)=>this.scrollView=ref}
                          <ScrollView>
                             {/*占位*/}
                             <View style={styles.blockView}/>
                             {
                                lyric.map((item, index)=>{
                                   return(
                                       <Text key={index} style={[styles.lyricText, lineNum === index ? styles.lyricTextActive: styles.lyricTextNormal]}>
                                          {item}
                                       </Text>
                                   )
                                })
                             }
                             {/*占位*/}
                             <View style={styles.blockView}/>
                          </ScrollView>
                      }
                   </View>

                {/*   /!*底部工具*!/*/}
                   <View style={styles.bottomView}>
                      <View></View>
                      <View style={styles.bottomView_center}>
                         <Text style={styles.timeText}>{secondsFormat(seconds)}</Text>
                         <Slider
                             maximumValue={100}
                             step={1}
                             style={styles.slideContainer}
                             value={progress}
                             onValueChange={changeSeconds}
                            onSlidingComplete={changeProgress}
                             onSlidingStart={slideStart}
                         />
                         <Text style={styles.timeText}>{secondsFormat(duration)}</Text>
                      </View>
                      <View style={styles.bottomView_bottom}>
                         <Icon
                             name='loop'
                             type='entypo'
                             color='white'
                             onPress={() =>{
                                navigation.goBack()
                             }}
                         />
                         <Icon
                             name='stepbackward'
                             type='antdesign'
                             color='white'
                             onPress={() =>{
                                navigation.goBack()
                             }}
                         />
                          {/*播放控制按钮*/}
                          <TouchableOpacity onPress={()=>{
                              setPlay(!play)
                              if (play) {
                                  playMusic()
                              }else {
                                  pauseMusic()
                              }
                          }}>
                              <Icon
                                  name={play?'play':'pausecircle'}
                                  type='antdesign'
                                  color='white'
                              />
                          </TouchableOpacity>

                          <Icon
                              name='stepforward'
                              type='antdesign'
                              color='white'
                              onPress={() =>{
                                  navigation.goBack()
                              }}
                          />
                          <Icon
                              name='menufold'
                              type='antdesign'
                              color='white'
                              onPress={() =>{
                                  navigation.goBack()
                              }}
                          />
                      </View>
                   </View>
            </ImageBackground>
        </View>
    )
}