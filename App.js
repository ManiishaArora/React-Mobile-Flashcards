import React from 'react';
import { StyleSheet, Text, View,StatusBar ,Platform} from 'react-native';
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { purple, white,gray } from './utils/colors'
import { TabNavigator,StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {createStore} from 'redux'
import  {Provider} from 'react-redux'
import reducer from './reducers/index'

const AppStatusBar = ({backgroundColor, ...props}) => 
{
  return(
  <View style={{ backgroundColor, height: Expo.Constants.statusBarHeight  }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)}

const Tabs = TabNavigator({
    Home:{
      screen:Decks,
      navigationOptions:{
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
      },
    }
  },
  {
    navigationOptions: {
      header:null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? gray : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : gray,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    },
})
const Stacks = StackNavigator({
  Home:{
    screen:Tabs
  },
  Deck:{
    screen:Deck,
    navigationOptions:{
      headerStyle:{
        backgroundColor:purple
      },
      headerTintColor:white
    }
  },
  AddDeck:{
    screen:AddDeck,
    navigationOptions:{
      headerStyle:{
        backgroundColor:purple
      },
      headerTintColor:white
    }
  },
  AddCard:{
    screen:AddCard,
    navigationOptions:{
      headerStyle:{
        backgroundColor:purple
      },
      headerTintColor:white
    }
  },
  Quiz:{
    screen:Quiz,
    navigationOptions:{
      headerStyle:{
        backgroundColor:purple
      },
      headerTintColor:white
    }
  }
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <View style={styles.container}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <Stacks />
      </View>
      </Provider>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
