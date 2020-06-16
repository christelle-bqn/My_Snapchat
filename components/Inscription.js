import React from 'react';
import { Actions } from 'react-native-router-flux';

import { StyleSheet ,Text ,TouchableOpacity ,View ,TextInput } from 'react-native';

export default class Inscription extends React.Component {
  constructor(){
    super();
    this.state={ password:'', email:'' }
  }
  goToConnection = () => {
    Actions.connection()
  }

  handleSubmit = event =>{
    event.preventDefault();
    console.log('User Password : ' + this.state.password)
    console.log('User Email : ' + this.state.email)
    const url ='http://snapi.epitech.eu/inscription'
    const data = { password: this.state.password, email: this.state.email }
    console.log(data ,'DataTest');
        
    var y = fetch(url, { 
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
 
    })
    .then(res => res.json())
    .catch(err => console.error('Error:', err))
    .then(response => {
      if(response.data.email !== "can't be blank"){
        alert('Merci pour votre inscription =)')
        Actions.connection()
      }
      if (response.data.password == "can't be blank" && response.data.email == "can't be blank") {
        alert("Mot de passe et email manquant")
      }
      else if(response.data.password == "can't be blank"){
        alert("Mot de passe manquant")
      }
      else if(response.data.email == "can't be blank"){
        alert("Email manquant")
      }
      console.log('Success:', response)}); 

    console.log(y,'UrlTest');
  }

    render(){
    return (
    <View style={styles.container}>
      <TextInput 
      style={input.container} 
      type='email' name='email' 
      placeholder="Email" 
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      />  
      <TextInput 
      style={input.container} 
      secureTextEntry={true} name='password' placeholder="Password" 
      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      />
      <TouchableOpacity
        style = {styles.submitButton}
        onPress = {this.handleSubmit}>
        <Text style = {styles.submitButtonText}> S'inscrire </Text>
      </TouchableOpacity>
      <TouchableOpacity  
      style = {styles.submitButton}
      onPress = {this.goToConnection}>
      <Text style = {styles.submitButtonText}>Connection</Text>
      </TouchableOpacity>
    </View>
  )}   
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
