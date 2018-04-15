import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DeckList extends Component {
    static navigationOptions = ({navigation}) =>{
        const {name} = navigation.state.params
        return {
            title:name
        }
    }
    render(){
        return(
            <View style={styles.container}>
            <Text>DeckList File</Text>
          </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default DeckList
