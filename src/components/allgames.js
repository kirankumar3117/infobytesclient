import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "../styles/Allgames.module.css"


export default  function Allgames(){
    const [games,setGames]=useState([]);
    const [alert,setAlert]=useState({});
    const [notification,setNotification]=useState([]);
    const [newdata,setNewdata]=useState([]);
    const navigate=useNavigate();
    const [userid,setUserid]=useState(null);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setGames([])
        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user)
        if(!user){
            navigate("/main")
        }

        async function getuser(user){
            setGames([]);
            const {data}=await axios.get(`https://drab-waders-ray.cyclic.app/user/${user}`);
            console.log(data.alert)
           
            if(data.notification){
                data.notification.map((e)=>{
                    return setGames([e,...games])
                })
            }
             if(data.alert){
                setGames([data.alert,...games])
            }
        }



        getuser(user)

       

        console.log(games)
        
    },[])
   
    useEffect(()=>{

        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user)
        setUserid(user)
        if(!user){
            navigate("/main")
        }

        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },3000)



       



        
        
        
    },[])
    return(
        
        <div className={styled.Container}>
               
            <div className={styled.yourgames}>
                Your Games
            </div>

          

                {games.length==0 ? <div className={styled.notfound}>
               
               <div>No Games Found</div>
               <button type="button" class="btn btn-warning" onClick={()=>navigate("/playwith")}>Start a new game</button>
           


            </div> : 
            
            
            //displaying  all the games found
            <div >
                {games.map((e)=>{
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
            
            
            
            
            }

            {loading ? <div class="text-center" className={styled.loading}>
            <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            </div> : null}

    
            {games.length!=0 ? <div className={styled.last}>
            <button type="button" class="btn btn-info" onClick={()=> navigate("/playwith")}>+ New Game</button>
            </div>: null}

        </div>
    )
}