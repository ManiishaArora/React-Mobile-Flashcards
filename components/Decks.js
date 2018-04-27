import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native';
import {fetchDecksForHomeView} from '../utils/api'
import { purple, white,lightPurp, gray } from '../utils/colors'

class Decks extends Component {
    state = {
      decks:[]
    }
    componentDidMount = async () => {
      await this.loadView()
    }
    loadView = async () => {
      decks = JSON.parse(await fetchDecksForHomeView())
      this.setState({decks})
    }
    renderItem = ({item}) => {
      const deck = item
      const {decks}=this.state
      const totalCards = decks[deck].questions.length
      return(
        <View key={deck}>
          <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Deck', { name: deck,totalCards,onBack:this.loadView})}
          style={styles.deck}>
              <Text style={[styles.deckContent,styles.deckTitle]}>{deck}</Text>
              <Text style={styles.deckContent}>{totalCards} cards</Text>
          </TouchableOpacity>
        </View>
      )
    }
    render(){
        const {decks}=this.state
        return(
            <View style={styles.container}>
              <View style={styles.deckContainer}>
                <FlatList 
                data = {Object.keys(decks)}
                renderItem = {this.renderItem}
                keyExtractor={(item, index) => index}
                />
               
              </View>
              <View>
                <TouchableOpacity onPress = {()=>this.props.navigation.navigate('AddDeck', 
                  { name: 'Add New Deck',onBack:this.loadView  })} style={styles.addDeck}>
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
       backgroundColor:lightPurp,
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

export default Decks
