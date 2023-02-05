import { GAME_DATA } from "./gameplay.type";

import axios from "axios";

export const get_game_data=(value)=>(dispatch)=>{
    axios.get(`http://localhost:8080/game/${value}`).then((res)=>{
        dispatch({type:GAME_DATA,payload:res.data})
    })
   
   
   
}

export const get_myuser_data=(value)=>(dispatch)=>{
 
   
    axios.get(`https://drab-waders-ray.cyclic.app/user/${value}`).then((res)=>{
        dispatch({type:get_myuser_data,payload:res.data});
    })
  
}
