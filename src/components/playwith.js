

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "../styles/Playwith.module.css"

export default function Playwith(){
    const [userdata,setUserdata]=useState(null);
    const [pop,setPop]=useState({
        notfound:false,
        inplay:false,
    })
    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState(
        {
            email:null
        }
    );
    const navigate=useNavigate();

    //getting user and sending req
    const handleStart=async()=>{
       setLoading(true)
        console.log(userdata)
       
        let userlocalstorage=localStorage.getItem("infobyteuser");
        userlocalstorage=JSON.parse(userlocalstorage)
       
       
        async function get(user){
            const {data}=await axios.get(`https://drab-waders-ray.cyclic.app/user/${user}`);

            // console.log("data",data._id)

            setUserdata(data);
        }
       
       get(userlocalstorage)
      
        const response = await axios.post(
            "https://drab-waders-ray.cyclic.app/usertoplay",user
          );
          console.log(response.data);
          setLoading(false)
          if(response.data=="user not found"){
            setPop({...pop,notfound:true});
            setTimeout(()=>{
                setPop({...pop,notfound:false})
                setLoading(false)
            },1500)
            return
          }
        var currentdate = new Date(); 
        var day = currentdate.getDate();
        var month=currentdate.getMonth();
        var year=currentdate.getFullYear();
        var hours=currentdate.getHours();
        var minutes=currentdate.getMinutes();
        function getmonthandtime(month,hours){
            if(hours<12){
                hours=`${hours}:${minutes}am`
           }
           else if(hours==12){
               hours=`${hours}:${minutes}pm`; 
           }
           else{
               hours=`${+hours-12}:${minutes}pm`
           }

           if(month==0){
             month="Jan"
           }
           else if(month==1){
            month="Feb"
           }
           else if(month==2){
            month="March"
           }
           else if(month==3){
            month="April"
           }
           else if(month==4){
            month="May"
           }
           else if(month==5){
            month="June"
           }
           else if(month==6){
            month="July"
           }
           else if(month==7){
            month="Aug"
           }
           else if(month==8){
            month="Sep"
           }
           else if(month==9){
            month="Oct"
           }
           else if(month==10){
            month="Nov"
           }
           else if(month==11){
            month="Dev"
           }
           
            return {month,hours}
        }

        const all=getmonthandtime(month,hours);

        console.log(all)

        


          const games={
            "game":`Game with ${userdata.name}`,
            "content":`${userdata.name} just made their move!`,
            "move":"It's your turn to play now.",
            "timezone":`${day}th ${all.month} ${year}. ${all.hours}`
          }
          console.log(games);
          const patchres = await axios
          .patch(`http://localhost:8080/update/gamerequest/${response.data._id}`,{
            alert:games
          });

          



        //   if(response.data.play==true){
        //     setPop({...pop,inplay:true});
        //     setTimeout(()=>{
        //         setPop({...pop,inplay:false})
        //         setLoading(false)
        //     },1500)
        //   }
         
       
            // setPop({...pop,notfound:true});
            // setTimeout(()=>{
            //     setPop({...pop,notfound:false})
            //     setLoading(false)
            // },1500)
          
    }
   

    //checking user for the details
    useEffect(()=>{
        let user=localStorage.getItem("infobyteuser");
        user=JSON.parse(user)
       
       
        async function get(user){
            const {data}=await axios.get(`https://drab-waders-ray.cyclic.app/user/${user}`);

            // console.log("data",data._id)

            setUserdata(data);
        }
       
       get(user)
        // function start() {

        //     setTimeout(function() {
               
        //       start();
        
        //       get(user);


        //     }, 5000);
        // }

        // let star=start();
    },[])
    return(
        <div className={styled.Container}>
            <div className={styled.Back} >
                <button onClick={()=>
                navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
            </div>
            <div className={styled.topcontent}>
                <p>
                    Start a new game
                </p>
            </div>
            <div className={styled.contentDetails}>
                <p>Whome do you want to play with ?</p>
            </div>
            <div className={styled.form}>
                
                <lable>Email</lable>
                <input type="email" class="form-control " placeholder="Type player email"onChange={(e)=>{
                    setUser({...user,email:e.target.value})
                }} />
                
            </div>
            {loading ?<div class="text-center" className={styled.loading}>
            <div class="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            </div> : null}
            <div className={styled.Login}>
               <button type="button" className="btn btn-warning" onClick={()=>{
                handleStart()
               }}>Start game</button>
            </div>
            {pop.notfound ? <div className={styled.poperror}>
           <button type="button" className="btn btn-danger" >User not exists !</button>
           </div> : null}
            {pop.inplay ? <div className={styled.poperror}>
           <button type="button" className="btn btn-danger" >User Already In Play !</button>
           </div> : null}
        </div>
    );
}