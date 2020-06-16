import React,{ useEffect,useState } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Connection from '../components/Connection.js'
import Inscription from '../components/Inscription'
import Post from '../components/Post'
import AsyncStorage from '@react-native-community/async-storage';
import AllSnap from '../components/AllSnap.js'
import DetailSnap from '../components/DetailSnap.js'


const Routes = () => {

   const [isLoggedin,setLogged] = useState(null)
   const [token,setToken] = useState(null)

   useEffect(() => { 
      async function fetch() {
      const tmpToken = await AsyncStorage.getItem('token')
      
      console.log(tmpToken,'tmptokeeen');
      if(tmpToken){
         setToken(tmpToken)
         // AsyncStorage.removeItem('token')
         setLogged(true) 
      }else{
         setLogged(false)
      }
   } fetch()},[])
   return(
      <Router>
         <Scene key = "root">
            {
               (<>
               <Scene key="post" navigationBarStyle={{display:'none'}} component={Post} token={token} initia ={isLoggedin} />
               <Scene key="connection" navigationBarStyle={{display:'none'}} component = {Connection} initial={!isLoggedin} />
               <Scene key="inscription" navigationBarStyle={{display:'none'}} component = {Inscription} />
               <Scene key="allsnap" navigationBarStyle={{display:'none'}} component = {AllSnap} />
               <Scene key="detailsnap" navigationBarStyle={{display:'none'}} component = {DetailSnap} />
               </>
               )  
            }
         </Scene>
      </Router>
   )

}


export default Routes