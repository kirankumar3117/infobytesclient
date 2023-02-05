import { GAME_DATA } from "./gameplay.type";

const initial={
    gamedata:{},
    myuser:{},
    otheruser:{}
 }

 export const GetGameData=(state=initial,{type,payload})=>{
    switch(type){
        case GAME_DATA:{
            return {
                ...state,
                gamedata:payload
            }
        }
        default:{
            return state
        }
    }
 }