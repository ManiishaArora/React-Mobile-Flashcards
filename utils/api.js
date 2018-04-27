import {AsyncStorage} from 'react-native'
import {getDefaultDecks} from './helpers'

const DECKS_STORAGE_KEY='app@DECKS_STORAGE_KEY1'
export const fetchDecksForHomeView = async () => {
    let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    if(decks !=null){
        return decks
    }else{
        await AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(getDefaultDecks()))
        decks =  await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        return decks 
    }
   
}
export const addNewDeck = async (title) => {
    let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    if(decks !=null){
        decks=JSON.parse(decks)
        if(title in decks){ //Do not add/replace if Card already exists
            return false
        }
    }
    let newDeck = { }
    let content = { }
    
    content.title=title
    content.questions=[]

    newDeck[title]=content  
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(newDeck))
    return true
}

export const addNewCard = async (question,answer,deck) => {
    let decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY))
    decks[deck].questions.push({'question':question,'answer':answer})
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify(decks))
}

export const getCards = async (deck) => {
    let decks = JSON.parse(await AsyncStorage.getItem(DECKS_STORAGE_KEY))
    return decks[deck].questions
}