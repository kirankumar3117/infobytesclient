import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "../styles/Allgames.module.css"


export default  function Allgames(){
    const [games,setGames]=useState([]);
    const navigate=useNavigate()
    useEffect(()=>{
        let user=localStorage.getItem("infobyteuser");
        if(!user){
            navigate("/main")
        }
    },[])
   
    return(
        
        <div className={styled.Container}>
               
            <div className={styled.yourgames}>
                Your Games
            </div>

            {games.length==0 ? <div className={styled.notfound}>
               
               <div>No Games Found</div>
               <button type="button" class="btn btn-warning" onClick={()=>navigate("/playwith")}>Start a new game</button>
           


            </div> : <div>not games</div>}

        </div>
    )
}