import {Dimensions} from 'react-native'

const winW = Dimensions.get('window').width
const winH = Dimensions.get('window').height


export default function getStyle () {

    return{
        headerContainer: {
            backgroundColor: 'white'
        },

        lineStyle: {
            backgroundColor:'red',
            height: 1,
        }
    }
}
