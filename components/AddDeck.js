import React,{Component} from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView,TextInput,TouchableOpacity,Alert} from 'react-native';
import { purple, white,lightPurp, gray } from '../utils/colors'
import {addNewDeck} from '../utils/api'

class AddDeck extends Component {
    state = { text: '' }
    static navigationOptions = ({navigation}) =>{
        const {name} = navigation.state.params
        return {
            title:name
        }
    }
    submit = async () => {
        const {text} = this.state
        if(text.trim()===''){
            Alert.alert('Mandatory',"Please enter a name for creation of a deck")
            return
        }
        created = await addNewDeck(text)
        if(created===false){
            Alert.alert('Error!',"Already a deck exists with this title")
            return
        }
        this.props.navigation.state.params.onBack() //Refresh Parent State
        this.props.navigation.navigate('Deck', { name: text,totalCards:0,onBack:this.props.navigation.state.params.onBack})
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>What is the title of your Deck?</Text>
                </View>
                
                <TextInput
                    style={styles.titleTextInput}
                    autoFocus
                    placeholder='Deck Title'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                 <TouchableOpacity onPress = {()=>this.submit()} style={styles.addDeck}>
                        <Text style={{color:white,textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
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
    titleContainer:{
        marginBottom:30
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold'
    },
    titleTextInput:{
        padding:10,
        borderRadius:3,
        margin:5,
        width:300,
        height: 40, borderColor: gray, borderWidth: 1
    },
    addDeck:{
        backgroundColor:gray,
        padding:10,
        borderRadius:3,
        margin:5,
        marginTop:30,
        width:120
     }
  });

export default  AddDeck