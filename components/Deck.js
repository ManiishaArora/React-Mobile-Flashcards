import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { gray,white } from '../utils/colors';

class Deck extends Component {
    static navigationOptions = ({navigation}) =>{
        const {name} = navigation.state.params
        return {
            title:name
        }
    }
    state={
        totalCards:this.props.totalCards
    }
    refresh =  () => {
        this.setState({totalCards:this.state.totalCards+1})
        this.props.reload() //Refresh the Parent View
    }
    render(){
        const {name} = this.props
        const {totalCards} = this.state
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
                <TouchableOpacity onPress = {()=>{console.log('pressed')}} style={[styles.btn,{backgroundColor:gray}]}>
                        <Text style={{color:white,textAlign:'center',fontSize:16}}>Start Quiz</Text>
                </TouchableOpacity>
          </View>
        )
    }

}
const mapStateToProps = (state, { navigation }) => {
    const {name,totalCards} = navigation.state.params
    return {
        name,
        totalCards
    }
}
const mapDispatchToProps = (dispatch, { navigation }) => {
    return {
      reload: () => navigation.state.params.onBack()
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

export default  connect (mapStateToProps,mapDispatchToProps)(Deck)