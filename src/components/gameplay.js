
import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom"
import styled from "../styles/Gameplay.module.css"
import { useSelector,useDispatch } from 'react-redux'
import { get_game_data, get_myuser_data } from "../store/gameplay.action";
export default function Gameplay(){

const navigate=useNavigate()

const [state,setState]=useState(false);
const {id}=useParams();
const [data,setData]=useState(null);
const [newdata,newsetData]=useState(null);
const {gamedata}=useSelector((state)=>state.getgamedata);
   
   const dispatch=useDispatch()
    useEffect(()=>{
        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user);
        console.log("user",user)
        function start(){
            setTimeout(()=>{
                dispatch(get_game_data(id));
                dispatch(get_myuser_data(user));
                start()
            },3000)
        }

 
       start();
        // console.log(data)
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




            <div>
                    {gamedata.userid1}
            </div>
        </div>
    )
}