import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { blue,red,white, gray } from '../utils/colors';
import {getCards} from '../utils/api'
import {clearLocalNotification,setLocalNotification} from '../utils/helpers'

class Quiz extends Component {
    static navigationOptions = ({navigation}) =>{
        const {name} = navigation.state.params
        return {
            title:name
        }
    }
    state = {
        questions:[],
        attempted:0,
        correctAttempt:0,
        showQuestion:true,
        completed:false
    }
    componentDidMount = async () => {
        this.getQuestions()
    }
    getQuestions = async () => {
        const {deck} = this.props.navigation.state.params
        let questions = await getCards(deck)
        this.setState({questions})
    }
    answer = (option) => {
        let {questions,attempted,completed,correctAttempt,showQuestion} = this.state
        
        if(completed){
            return
        }
        correctAttempt=(option=='Correct')?correctAttempt+1:correctAttempt
        attempted=(questions.length>=attempted+1)?attempted+1:attempted
        completed=(questions.length===attempted)?true:false
        showQuestion=true 
        
        if(completed){
            clearLocalNotification()
            .then(setLocalNotification)
        }
        this.setState({questions,attempted,completed,correctAttempt,showQuestion})
    }
    restart = () => {
        this.setState({
            questions:[],
            attempted:0,
            showQuestion:true,
            completed:false,
            correctAttempt:0
        })
        this.getQuestions()
    }
    render(){
        const {questions,attempted,showQuestion,completed,correctAttempt} = this.state
        return(
            <View style={styles.container}>
                {questions.length!==0 && completed===false &&
                    <View style={styles.quizContainer}>
                        <View style={styles.progressBlock}>
                            <Text style={styles.progressText}>{(attempted+1)+'/'+questions.length}</Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                            {showQuestion===true?questions[attempted].question:questions[attempted].answer}
                            </Text>
                        </View>
                        <TouchableOpacity onPress = {()=>this.setState({showQuestion:!showQuestion})}>
                                <Text style={{color:red,textAlign:'center'}}>
                                {showQuestion===true?'See Answer':'See Question'}
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>this.answer('Correct')} style={[styles.btn,{backgroundColor:blue, marginTop:30}]}>
                                <Text style={{color:white,textAlign:'center'}}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>this.answer('Incorrect')} style={[styles.btn,{backgroundColor:red}]}>
                                <Text style={{color:white,textAlign:'center'}}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    completed===true && 
                    <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                You've scored: {correctAttempt} out of {questions.length}
                            </Text>
                            <TouchableOpacity onPress = {()=>this.restart()} style={[styles.btn,{backgroundColor:blue, marginTop:30}]}>
                                <Text style={{color:white,textAlign:'center'}}>Restart Quiz</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {()=>this.props.navigation.goBack()} 
                            style={[styles.btn,{backgroundColor:gray, marginTop:5}]}>
                                <Text style={{color:white,textAlign:'center'}}>Go Back</Text>
                            </TouchableOpacity>
                    </View>
                }
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
    quizContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    progressText:{
      textAlign:'left'
    },
    progressBlock:{
       width:300 
    },
    titleContainer:{
        margin:5,
        marginBottom:15,
        width:300
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    btn:{
        padding:10,
        borderRadius:3,
        margin:5,
        width:300
     },

  });

export default Quiz
