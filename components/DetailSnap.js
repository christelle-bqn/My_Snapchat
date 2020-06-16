import React, { Component } from 'react';
import { FlatList ,StyleSheet,List ,Text ,View ,Image,TouchableHighlight } from 'react-native';
import  AsyncStorage from '@react-native-community/async-storage';

export default class DetailSnap extends Component {
  constructor(props){
    
    super(props);

    this.state={ 
      image:'',
      isLoading: true,
      dataSource:[]
    }
    console.log(this.props.snap_id,"detaiiil");
  }

  

  render(){
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'token': this.props.token 
      }
    }
    return (      
      <View>
        <Image
          style={{width: 100,height: 100}}
          source={{
          uri: 
          fetch(`http://snapi.epitech.eu/snap/${this.props.snap_id}`,requestOptions)
          .then((response) => JSON.stringify(response.text()))
            .then( (result)  => {
              console.log(result);           
            })
            .catch(this.props.snap_id,error => console.log('error', error))
          }}
      />
      </View>
    )  
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  } ,
  item: {
    padding:5,
    borderBottomWidth:1,
    borderBottomColor: '#eee'
  }
});








