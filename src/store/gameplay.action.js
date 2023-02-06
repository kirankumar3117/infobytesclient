import { GAME_DATA, GET_ALL_GAMES, MY_USER } from "./gameplay.type";

import axios from "axios";

export const get_game_data=(value)=>(dispatch)=>{
    axios.get(`https://drab-waders-ray.cyclic.app/game/${value}`).then((res)=>{
        dispatch({type:GAME_DATA,payload:res.data})
    })
   
   
   
}

export const get_myuser_data=(value)=>(dispatch)=>{
 
   
    axios.get(`https://drab-waders-ray.cyclic.app/user/${value}`).then((res)=>{
        dispatch({type:MY_USER,payload:res.data});
    })
  
}


export const get_all_games=(value)=>(dispatch)=>{
    let data=[];
    axios.get(`https://drab-waders-ray.cyclic.app/user/${value}`).then((res)=>{
        if(res.data.notification.length>0){
            for(var i=res.data.notification.length-1;i>=0;i--){
                data=[res.data.notification[i],...data]
            }
        }
        if(res.data.alert){
            data=[res.data.alert,...data]
        }
        console.log(data)
        dispatch({type:GET_ALL_GAMES,payload:data})
    })
}