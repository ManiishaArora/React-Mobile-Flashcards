import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {getDefaultDecks} from '../utils/helpers'
import { purple, white,lightPurp, gray } from '../utils/colors'
import {connect} from 'react-redux'

class Decks extends Component {
    state = {
      decks:[]
    }
    componentDidMount(){
      decks = getDefaultDecks()
      this.setState({decks})
      
    }
    render(){
        const {decks}=this.state
        return(
            <View style={styles.container}>
              <View style={styles.deckContainer}>
                {Object.keys(decks).map(deck => {
                return(
                  <View key={deck}>
                  <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('DeckList', { name: deck })}
                  style={styles.deck}>
                      <Text style={[styles.deckContent,styles.deckTitle]}>{deck}</Text>
                      <Text style={styles.deckContent}>3 cards</Text>
                  </TouchableOpacity>
                  </View>
                )
                  
                })}
              </View>
              <View>
                <TouchableOpacity onPress = {()=>{console.log('pressed')}} style={styles.addDeck}>
                        <Text style={{color:white,textAlign:'center'}}>Add New Deck</Text>
                    </TouchableOpacity>
              </View>
          </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop:30,
      marginBottom:30
    },
    deckContainer:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    deck:{
       backgroundColor:purple,
       padding:13,
       borderRadius:3,
       margin:5,
       width:300
    },
    deckContent:{
      textAlign:'center',
      color:white
    },
    deckTitle:{
      fontSize:18,
      fontWeight:'bold'
    },
    addDeck:{
       backgroundColor:gray,
       padding:10,
       borderRadius:3,
       margin:5,
       width:300
    }
  });

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(Decks)
