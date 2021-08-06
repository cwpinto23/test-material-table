import {useEffect,useState,useRef} from 'react'
import axios from 'axios'


export const basicGet=( {urlData,consoleOn})=>{


    if (consoleOn===undefined) consoleOn=false

    if (consoleOn)   console.log("urlData basicget",urlData)

    const [state,setState] = useState({data:null,loading:false});


    //whenever url changes, fetch data
    useEffect(() => {
      //  console.log("rendering")
       setState(state=>({data:state.data,loading:true}))
      axios.get(urlData).then(res=>{
          return res.data
      }).then(data=>{
      if (consoleOn)    console.log("data returned is",data)
          setState({data:data,loading:false})
      }).catch(err=>{
          console.log("err",err)
      }) 
    },[urlData]) //including this means it's called everytime it changes  (also, you should add functions as dependencies)

    return state
}

