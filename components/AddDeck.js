import React,{Component} from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView,TextInput,TouchableOpacity} from 'react-native';
import { purple, white,lightPurp, gray } from '../utils/colors'
import { connect } from 'react-redux'
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
        await addNewDeck(this.state.text)
        const {  goBack,reload } = this.props
        goBack()
        reload()
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
  const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
      goBack: () => navigation.goBack(),
      reload: () => navigation.state.params.onBack()
    }
  }

export default  connect (mapDispatchToProps)(AddDeck)