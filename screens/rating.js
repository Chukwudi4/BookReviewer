import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import { fetchCover } from '../config/fetchcover'
import {
    heightPercentageToDP as h,
    widthPercentageToDP as w
  } from "react-native-responsive-screen";
import {Icon} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

export class Ratings extends React.Component{

    state = {
        ratings: [],
        isbn: "",
        title: "Nora Robert",
        thumbnailUrl: ''
    }

    componentDidMount(){
        let ratingsString = this.props.navigation.getParam('ratings', '{}')
        let ratings = JSON.parse(ratingsString)
        this.setState({ratings:ratings.book.critic_reviews})
        const {title, sub_title, release_date, author, genre} = ratings.book
        this.setState({title: title, subtitle: sub_title, releaseDate: release_date, genre: genre, author: author})
        this.setState({isbn: this.props.navigation.getParam('isbn', "")})
        this.fetchCover()
    }

    render(){
        const {ratings, isbn, title, subtitle, author, releaseDate, genre, thumbnailUrl} = this.state
        return(
            <View style={styles.container}>
                
                <Image resizeMode="stretch" style={styles.image} source={{uri: `${ thumbnailUrl }`}} />
                <View>

                <Text style={{color:'black', fontSize: w('4.5%')}}><Text style={{fontWeight:'600'}} >Author:</Text> {author}</Text>
                <Text style={{color: 'black', fontSize: w('4.5%')}} ><Text style={{fontWeight:'600'}} >Genre:</Text> {genre}</Text>
                <Text numberOfLines={3} style={{color: 'black', fontSize: w('4.5%')}} ><Text style={{fontWeight:'600'}} >Title:</Text> {title}{subtitle}</Text>
                <Text style={{fontSize: w('4.5%')}} ><Text style={{fontWeight:'600'}} >Released:</Text> {releaseDate}</Text>
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

    fetchCover = async()=>{
        const isbn = this.props.navigation.getParam('isbn', "")

        const imageUrl = await fetchCover(isbn)
        this.setState({thumbnailUrl: imageUrl})
    }
}

SingleRating = props => {

    return(
        <View style= {{flexDirection:'row'}} >
            {[0,1,2,3,4,5].map((star, i)=>{
                console.warn(props.rating)
                return(
                    
                        <Icon 
                            key={i}
                            size={w('5%')} 
                            color={props.rating >= i? 'black': "white"} 
                            name="ios-star" 
                            type='ionicon' 
                        ></Icon>
                    
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
        alignItems: 'flex-start',
        padding: w('4.5%')
    },
    starView:{
        flexDirection: 'row'
    },
    image:{
        width: w('20%'),
        height: h('15%'),
        margin: w('2.5%')
    }
})