
import {createStackNavigator} from 'react-navigation'
import {Welcome} from '../screens/welcome'
import {ISBN} from '../screens/isbn'
import {Ratings} from '../screens/rating'
import {Barcode} from '../screens/barcode'
export const AppNavigator = createStackNavigator({
    welcome: Welcome,
    isbn: ISBN,
    ratings: Ratings,
    barcode: Barcode
})