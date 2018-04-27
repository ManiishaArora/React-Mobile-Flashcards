import React,{Component} from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView,TextInput,TouchableOpacity,Alert} from 'react-native';
import { purple, white,lightPurp, gray } from '../utils/colors'
import {addNewCard} from '../utils/api'

class AddCard extends Component {
    state = { question: '',answer:'' }
    static navigationOptions = ({navigation}) =>{
        const {name} = navigation.state.params
        return {
            title:name
        }
    }
    submit = async () => {
        
        const deck = this.props.navigation.state.params.deck
        const { question,answer } = this.state
        if(question.trim()===''||answer.trim()==''){
            Alert.alert('Mandatory',"Please enter both Question and answer for creation of a card")
            return
        }
        await addNewCard(question,answer,deck)
        this.props.navigation.goBack()
        this.props.navigation.state.params.onBack()
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <KeyboardAvoidingView style={styles.titleContainer} behavior="padding">
                    <TextInput style={styles.titleTextInput}
                    autoFocus
                    placeholder='Question'
                    onChangeText={(text) => this.setState({question:text})}
                    value={this.state.question}
                    />
                </KeyboardAvoidingView>
                
                <TextInput
                    style={styles.titleTextInput}
                    placeholder='Answer'
                    onChangeText={(text) => this.setState({answer:text})}
                    value={this.state.answer}
                />
                 <TouchableOpacity onPress = {()=>this.submit()} style={styles.AddCard}>
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
    AddCard:{
        backgroundColor:gray,
        padding:10,
        borderRadius:3,
        margin:5,
        marginTop:30,
        width:120
     }
  });

export default  AddCard