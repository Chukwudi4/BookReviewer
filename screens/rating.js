import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {
    heightPercentageToDP as h,
    widthPercentageToDP as w
  } from "react-native-responsive-screen";
import {Icon} from 'react-native-elements'

export class Ratings extends React.Component{

    state = {
        ratings: [],
        isbn: "",
        title: "Nora Robert"
    }

    componentDidMount(){
        let ratingsString = this.props.navigation.getParam('ratings', '{}')
        let ratings = JSON.parse(ratingsString)
        this.setState({ratings:ratings.book.critic_reviews})
        const {title, sub_title, release_date, author, genre} = ratings.book
        this.setState({title: title, subtitle: sub_title, releaseDate: release_date, genre: genre, author: author})
        this.setState({isbn: this.props.navigation.getParam('isbn', "")})
        const isbn = this.props.navigation.getParam('isbn', "")
        console.warn(`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
    }

    render(){
        const {ratings, isbn, title, subtitle, author, releaseDate, genre} = this.state
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                <Image resizeMode="stretch" style={styles.image} source={{uri: `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}} />
                <View>
                <Text style={{color:'black', fontSize: w('5%')}}>Author: {author}</Text>
                <Text style={{color: 'black', fontSize: w('5.5%')}} >Genre: {genre}</Text>
                <Text numberOfLines={3} style={{color: 'black', fontSize: w('5.5%'), width: w('40%')}} >Title: {title}{subtitle}</Text>
                <Text style={{fontSize: w('5.5%')}} >Released: {releaseDate}</Text>
                </View>
                </View>
                
                {
                    ratings.map((rating, key)=>{
                        return(
                            <View key={key}>
                                <SingleRating rating={rating.star_rating}/>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

SingleRating = props => {

    return(
        <View >
            {[0,1,2,3,4,5].map((star, i)=>{
                return(
                    <View key={i}>
                        <Icon 
                            size={w('5%')} 
                            color={props.star_rating >= i? 'black': "white"} 
                            name="ios-star" 
                            type='ionicon' 
                        />
                    </View>
                )
            })}
        </View>
    )
}
// AMAZON QUERY https://www.amazon.com/s?k=0749935332

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'rgb(126, 249, 255)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: w('4.5%')
    },
    starView:{
        flexDirection: 'row'
    },
    image:{
        width: w('40%'),
        height: h('40%'),
        margin: w('2.5%')
    }
})