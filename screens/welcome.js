import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import {
    heightPercentageToDP as h,
    widthPercentageToDP as w
  } from "react-native-responsive-screen";

export class Welcome extends React.Component{
    render(){
        return(
            <View style={styles.container}>

                <Text style={styles.infoText}>
                    Search rating for your favourite book by
                </Text>
                <Button
                    title="Scanning QR code"
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.barcodeButton}
                    onPress = {() => this.props.navigation.navigate('barcode')}
                />

                <Button
                    onPress= {()=> this.props.navigation.navigate('isbn')}
                    title="Typing in ISBN or name of book"
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.textButton}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgb(126, 249, 255)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    barcodeButton: {
        backgroundColor: 'rgb(76,81,109)',
        width:w('80%'),
        marginVertical: h('1.5%')
    },
    textButton:{
        backgroundColor: 'rgb(101, 147, 245)',
        width:w('80%'),
        marginVertical: h('1.5%')
    },
    buttonTitleStyle:{
        fontSize: w('5%')
    },
    infoText:{
        fontSize: h('2.5%'),
        color: 'rgb(0, 142, 204)'
    }
})