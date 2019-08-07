import React from 'react';
import { View, StyleSheet, ToastAndroid, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import Spinner from 'react-native-loading-spinner-overlay'
import { fectchRating } from '../config/fetchRating';

export class Barcode extends React.Component {
  state = {
    scanned: false,
    hasCameraPermission: false,
    loading: false
  };

  componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned, loading } = this.state;
    if (!hasCameraPermission) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>permission not granted</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
          <Spinner visible={ loading } animation="slide" />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.getRating(data)
    
  };

  getRating = async (term) => {
    //const { term } = this.state;
    this.setState({ loading: true });
    let ratings = await fectchRating(term);
    this.setState({ loading: false });
    if (ratings.book.review_count > 0) {
      this.props.navigation.navigate('ratings', {
        isbn: `${term}`,
        ratings: JSON.stringify(ratings),
      });
    } else if (ratings.total_results === 0) {
      ToastAndroid.show('Book not found', ToastAndroid.LONG);
      this.props.navigation.goBack();
    } else if (ratings.book.review_count === 0) {
      ToastAndroid.show(
        'There are no reviews for this book',
        ToastAndroid.LONG
      );
      this.props.navigation.navigate('ratings', {
        isbn: `${term}`,
        ratings: JSON.stringify(ratings),
      });
    }
  };
}
