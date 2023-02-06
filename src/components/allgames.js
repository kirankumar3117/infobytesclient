import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "../styles/Allgames.module.css"
import { useSelector,useDispatch } from 'react-redux'
import { get_all_games } from "../store/gameplay.action";

export default  function Allgames(){
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const {userallgames}=useSelector((state)=>state.getgamedata);
    const dispatch=useDispatch();
    useEffect(()=>{
        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user)
        if(!user){
            navigate("/main")
        }

        
        dispatch(get_all_games(user));


        function start(){

            setTimeout(()=>{
                dispatch(get_all_games(user));
                start()
            },5000)

        }

        start()
    },[])

    useEffect(()=>{
        console.log("allgames",userallgames)
        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user)
        if(!user){
            navigate("/main")
        }

        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },3000)   
    },[])
    const handle=()=>{
        console.log(userallgames)
    }
    return(
        
        <div className={styled.Container}>
               
            <div className={styled.yourgames}>
                Your Games
            </div>

          

                {userallgames.length==0 ? <div className={styled.notfound}>
               
               <div>No Games Found</div>
               <button type="button" class="btn btn-warning" onClick={()=>navigate("/playwith")}>Start a new game</button>
           


            </div> : null }
            
            
            {/* //displaying  all the games found */}
            <div >
                {userallgames.map((e)=>{
                    return <div className={styled.Details}>
                    <div className={styled.gamewith}>{e.game}</div>
                    <div className={styled.move}>{e.content}</div>
                    {e.move ? <div className={styled.yourmove}>{e.move}</div>: null}

                    {e.gamestatus ?<div className={styled.timezone}>{e.gamestatus}</div> : null}
                    <div className={styled.timezone}>{e.timezone}</div>
                    <div className={styled.button}>
                    <button type="button" className="btn btn-warning" >{e.move ? "play!" : "view"}</button>

                    </div>
                </div>
                })}
                
            </div>
            
            
            
            
            
           

            {loading ? <div class="text-center" className={styled.loading}>
            <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            </div> : null}

    
            {userallgames.length!=0 ? <div className={styled.last}>
            <button type="button" class="btn btn-info" onClick={()=> navigate("/playwith")}>+ New Game</button>
            </div>: null}

        </div>
    )
}