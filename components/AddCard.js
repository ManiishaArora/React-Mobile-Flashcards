import React,{Component} from 'react';
import { StyleSheet, Text, View ,KeyboardAvoidingView,TextInput,TouchableOpacity} from 'react-native';
import { purple, white,lightPurp, gray } from '../utils/colors'
import { connect } from 'react-redux'
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
        const {  goBack,reload,deck } = this.props
        const { question,answer } = this.state
        await addNewCard(question,answer,deck)
        goBack()
        reload()
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
  const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
      goBack: () => navigation.goBack(),
      reload: () => navigation.state.params.onBack()
    }
  }

  const mapStateToProps = (state, { navigation }) => {
    const {name,deck} = navigation.state.params
    return {
        name,
        deck
    }
}

export default  connect (mapStateToProps,mapDispatchToProps)(AddCard)