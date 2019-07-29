import {React} from 'react'
import {View} from 'react-native'
import {Camera, BarCodeScanner, Permissions} from 'expo'

export class Barcode extends React.Component{

    state = {
        scanned: false,
        hasCameraPermission: false
    }

    componentDidMount(){
        this.getPermissionsAsync
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render(){
        const {hasCameraPermission, scanned} = this.state
        if(!hasCameraPermission){
            return(
                <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>permission not granted</Text>
                </View>
            )
        }

        return(
            <View>
                        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
            </View>
        )
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
}