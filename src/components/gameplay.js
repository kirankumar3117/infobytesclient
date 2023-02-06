
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom"
import styled from "../styles/Gameplay.module.css"
import { useSelector,useDispatch } from 'react-redux'
import { get_game_data, get_myuser_data, get_other_user } from "../store/gameplay.action";
import {GiAnarchy} from "react-icons/gi"
export default function Gameplay(){

const navigate=useNavigate()

const [state,setState]=useState(false);
const {id}=useParams();
const [data,setData]=useState(null);
const [newdata,newsetData]=useState(null);
const {gamedata}=useSelector((state)=>state.getgamedata);
const {myuser,otheruser}=useSelector((state)=>state.getgamedata)
   const dispatch=useDispatch()
    useEffect(()=>{
       
        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user);
         if(!user){
            navigate("/main")
        }
        

        function start(){
            setTimeout(()=>{
                dispatch(get_game_data(id));
                dispatch(get_myuser_data(user));
                if( gamedata.userid1==user){
                   dispatch(get_other_user(gamedata.userid2));
                }else {
                     dispatch(get_other_user(gamedata.userid1));
                }
                start()
                // console.log("gamedata",gamedata)
                console.log(otheruser)
            },3000)
        }

 
       start();
        
     },[])

    return (

        <div className={styled.Container}>
            <div className={styled.Back} >
                <button onClick={()=>
                navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
            </div>
                   <div className={styled.username}>Game with {otheruser.name}</div>
           
                   <div>
                    <div>Your piece</div>
                    <div><GiAnarchy color="blue" size="30"/></div>
                   </div>

                    <div>content</div>
                    <div>
                        for boxes
                    </div>
                    
          

            {/* submit button */}
            <div className={styled.lastbutton}>
                        <button type="button" class="btn btn-warning" >submit</button>
            </div>
        </div>
    )
}