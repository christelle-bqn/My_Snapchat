import React, { Component } from 'react';
import { FlatList ,StyleSheet,List ,Text ,View ,Image,TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class AllSnap extends Component {
  constructor(props){
    super(props);
    // console.log(this.props.token,"tokeenSnap");

    this.state={ 
      isLoading: true,
      dataSource:[]
    }
  }
  componentDidMount()
  {      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", this.props.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch("http://snapi.epitech.eu/snaps", requestOptions)
      .then((response) => response.json())
      .then((result) => {
          this.setState({
            isLoading: false,
            dataSource: result.data
          })
          console.log(result.data,'teeeeeest')
      })
     
      .catch(error => console.log('error', error));
    
  }
  
  
  
  _renderItem = ({item,index})=>{
    
    return(
      <TouchableHighlight 
        onPress={()=>{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", this.props.token);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            };
            fetch("http://snapi.epitech.eu/snaps", requestOptions)
            .then((response) => response.json())
            .then(async (result) => {
                try {
                    await AsyncStorage.setItem('token', this.props.token && 'snap_id',item.snap_id) 
            } catch (err) {
                console.error('Error:', err)
            } 
            Actions.detailsnap({token: this.props.token ,snap_id: item.snap_id})
        })
        }}>
            <Text style={styles.item}>From : {item.from}</Text>

      </TouchableHighlight>
    )
  }
  
  render(){
      let {dataSource,isLoading} = this.state
      

      return (
        <View style={styles.container}>
         <Icon  
        name="arrow-left"
        size={30}
        style={ {color:'#7a42f4',marginRight:300,marginBottom:20}}
        onPress = {()=>{
        Actions.post({token: this.props.token})
      
      }}></Icon>
          <FlatList
             
              data={dataSource}
              
              renderItem={this._renderItem}
              keyExtractor={(item, index)=>index.toString()}

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
    backgroundColor: 'yellow',
  } ,
  item: {
    padding:5,
    borderBottomWidth:1,
    borderBottomColor: 'brown'
  }
});

