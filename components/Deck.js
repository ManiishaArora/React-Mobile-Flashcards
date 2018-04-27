import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { gray,white } from '../utils/colors';

class Deck extends Component {
    static navigationOptions = ({navigation}) =>{
        const {name} = navigation.state.params
        return {
            title:name
        }
    }
    state={
        name:this.props.navigation.state.params.name,
        totalCards:this.props.navigation.state.params.totalCards
    }
    refresh =  () => {
        this.setState({totalCards:this.state.totalCards+1})
        this.props.navigation.state.params.onBack() //Refresh the Parent View
    }
    
    render(){
        const {name,totalCards} = this.state
        return(
            <View style={styles.container}>
                <Text style={styles.deckTitle}>{name}</Text>
                <Text>{totalCards} Cards</Text>

                <TouchableOpacity onPress = {()=>this.props.navigation.navigate('AddCard', { name: 'Add New Card',
                                                                                             deck:name,
                                                                                             onBack:this.refresh })} 
                style={styles.btn}>
                        <Text style={{textAlign:'center',fontSize:16}}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Quiz', { name: 'Quiz',
                                                                                             deck:name
                                                                                            })} 
                style={[styles.btn,{backgroundColor:gray}]}
                disabled={totalCards===0}>
                        <Text style={{color:white,textAlign:'center',fontSize:16}}>Start Quiz</Text>
                </TouchableOpacity>
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
    deckTitle:{
        fontSize:20,
        fontWeight:'bold'
      },
    btn:{
        padding:10,
        borderRadius:3,
        margin:5,
        marginTop:30,
        width:300,
        borderWidth:1,
        borderColor:gray,
        
    }
  });

export default  Deck