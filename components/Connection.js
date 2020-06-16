import React from 'react';
import { Actions } from 'react-native-router-flux';
import  AsyncStorage from '@react-native-community/async-storage';

import { StyleSheet ,Text ,TouchableOpacity ,View ,TextInput } from 'react-native';

const Connection=(props)=> {
    const [ Email, setEmail ] = React.useState('');
    const [ Password, setPassword ] = React.useState('');
    
    return (
        <View style={styles.container}>
        <TextInput 
        style={input.container} 
        defaultValue={Email}
        placeholder="Email" 
        onChangeText={(text) => {setEmail(text)}}
        />  
        <TextInput 
        style={input.container} 
        secureTextEntry={true} defaultValue={Password}
        placeholder="Password" 
        onChangeText={(text) => {setPassword(text)}}
        />
        <TouchableOpacity
        style = {styles.submitButton}
        onPress = {() => {
            console.log('User Password : ' + Password)
            console.log('User Email : ' + Email)
            const url ='http://snapi.epitech.eu/connection'
            const data = { password: Password, email: Email }
            console.log(data ,'DataTest');
            
                fetch(url, { 
                    method: 'POST',
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers:{ 'Content-Type': 'application/json' } 
                })
                .then(res => res.json())
                // .catch(err => console.error('Error:', err))
                .then(async (response) => {
                    try {
                            await AsyncStorage.setItem('token', response.data.token)
                      } catch (err) {
                        console.error('Error:', err)
                      }
                if(response.data == "Incorrect email or password"){
                    alert(response.data)
                    Actions.connection()
                }
                if(response.data != "Incorrect email or password"){
                    // console.log(response.data.token,'teeeest'); 
                    alert("Bienvenue !")
                    Actions.post({token: response.data.token})
                }
                console.log('Success:', response)
                });              
            }}>
        <Text style = {styles.submitButtonText}> Connexion </Text>
        </TouchableOpacity>
        <TouchableOpacity  
        style = {styles.submitButton}
        onPress = {()=>Actions.inscription()}>
        <Text style = {styles.submitButtonText}>Inscription</Text>
        </TouchableOpacity>

        </View>
    )   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginTop: 10
 },submitButtonText:{
    color: 'white'
 },buttonRegister:{
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginTop: 10
 } 
});

const input = StyleSheet.create({
  container: {
      height: 50,
      width:250, 
      fontSize: 20,
      backgroundColor: '#ffffff',
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      marginTop: 10,
    }
})

export default Connection