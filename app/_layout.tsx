import SongList from "./SongList"
import MyView from "./MyView"
import SongView from "./SongView"
import CreateBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Tab = CreateBottomTabNavigator()
const Stack =  createNativeStackNavigator()

export default function RootLayout() {
    return (
    <Tab.Navigator>
        <Tab.Screen name='SongList' component={SongList}/>
        <Tab.Screen name='SongView' component={SongView} initialParams={{id:1,name:'anxiety'}}/>
        <Tab.Screen name='MyView' component={MyView}/>
    </Tab.Navigator>
  );
}

function MusicScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SongList' component={SongList}/>
            <Stack.Screen name='PlaySongView' component={SongView}/>
        </Stack.Navigator>
    )
}
