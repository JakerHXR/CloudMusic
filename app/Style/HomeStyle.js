import {Dimensions} from 'react-native'

const winW = Dimensions.get('window').width
const winH = Dimensions.get('window').height


export default function getStyle() {

    return{
        container:{
            width: winW,
            height: winH,
            flex: 1
        },
        activeText: {
            color: 'black',
            fontSize: 18
        },

        normalText: {
            color: 'gray',
            fontSize: 16
        }
    }
}
