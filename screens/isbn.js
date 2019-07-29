import React from 'react'
import {ToastAndroid, StyleSheet,KeyboardAvoidingView, TextInput} from 'react-native'
import {
    heightPercentageToDP as h,
    widthPercentageToDP as w
  } from "react-native-responsive-screen";
import {fectchRating} from '../config/fetchRating'
import {Icon} from 'react-native-elements'
export class ISBN extends React.Component{

    state = {
        term: "0749935332",
        loading: false
    }

    render(){
        const {loading, term} = this.state
        return(
            
            
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TextInput style={styles.textInput}
                    value = {term}
                    placeholderTextColor='white'
                    numberOfLines= {5}
                    multiline = {true} 
                    onChangeText={(text) => this.setState({term: text})}
                    underlineColorAndroid='rgb(126, 249, 255)'
                    placeholder='Type in ISBN or name of book' />

                                    
                <Icon
                    name="md-search"
                    type='ionicon'
                    color = "white"
                    size={50}
                    disabled= {loading}
                    onPress={()=> this.getRating()}
                />
                </KeyboardAvoidingView>            
            
        )
    }

    getRating = async() =>{
        const {term} = this.state
        this.setState({loading: true})
        let ratings = await fectchRating(term)
        this.setState({loading: false})
        if(ratings.book.review_count >0){
            this.props.navigation.navigate('ratings', {isbn: `${term}`, ratings: JSON.stringify(ratings)})
        }else if(ratings.total_results === 0){
            ToastAndroid.show("Book not found", ToastAndroid.LONG)
        }else if(ratings.book.review_count === 0){
            ToastAndroid.show("There are no reviews for this book", ToastAndroid.LONG)
            this.props.navigation.navigate('ratings', {isbn: `${term}`, ratings: JSON.stringify(ratings)})
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgb(101, 147, 245)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput:{
        color: 'white',
        fontSize: h('7%'),
        width: w('90%'),
        textAlign: 'center',
        borderBottomWidth:0
    }
})