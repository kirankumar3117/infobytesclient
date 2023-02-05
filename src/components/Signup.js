
import styled from "../styles/Login.module.css"
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  
   const [success,setSuccess]=useState(false);
    const [user,setUser]=useState({
        user:null,
        username:null,
        password:null,
        email:null
    });
    const [pop,setPop]=useState({
        err:false,
        res:false,
        exist:false,
    });
    const navigate=useNavigate();
    



    const handleRegister=async()=>{
       
       if(user.name==null || user.email==null || user.password==null || user.username==null){
        setPop({...pop,err:true});

        setTimeout(()=>{
            setPop({...pop,err:false});
        },1500);
        return ;
       }
        try {
            const response = await axios.post('http://localhost:8080/register', user);
            
            console.log(response)
            setPop({...pop,res:true});
            
                setTimeout(()=>{
                    setPop({...pop,res:false});
                    setSuccess(true);
                    navigate("/login")
                },1500);
                

        } catch (error) {
            console.error(error);
            setPop({...pop,exist:true});

            setTimeout(()=>{
                setPop({...pop,exist:false});
                navigate("/login")
            },1500);
        }
    }
    useEffect(()=>{
        let user=localStorage.getItem("infobyteuser");
        if(user){
            navigate("/")
        }
    },[])
    return(
        <div className={styled.Container}>
            <div className={styled.Back} >
                <button  onClick={()=>
                navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
            </div>
            <div className={styled.topcontent}>
                <p>
                    Create account
                </p>
            </div>
            <div className={styled.contentDetails}>
                <p>Let's get to know you better!</p>
            </div>
            <div className={styled.form}>
                
                <lable>Your name</lable>
                <input type="text" class="form-control " placeholder="Type your name here" validate="true" onChange={(e)=>{
                    setUser({...user,name:e.target.value})
                }}/>
                <lable>Username</lable>
                <input type="text" class="form-control" placeholder="Type your username here"
                onChange={(e)=>{
                    setUser({...user,username:e.target.value})
                }}/>
                {!pop.err && !pop.res && !pop.exist ? <lable>Email</lable> : null}
               {!pop.err && !pop.res && !pop.exist? <input type="email" class="form-control" placeholder="Type your email here" onChange={(e)=>{
                    setUser({...user,email:e.target.value})
                }}/>: null }
                <lable>Password</lable>
                <input type="password" class="form-control" placeholder="Type your Password here" onChange={(e)=>{
                    setUser({...user,password:e.target.value})
                }}/>
            </div>
            <div className={styled.Login}>
               <button type="button" class="btn btn-warning" onClick={()=>{
                handleRegister()
               }}>Register</button>
            </div>
            {pop.err ?  <div className={styled.poperror}>
            <button type="button" class="btn btn-danger" >Enter all details</button> 
           </div>: null}
           {pop.res ? <div className={styled.poperror}>
           <button type="button" class="btn btn-success" >Congactulations!!! Account created.</button>
           </div> : null}
           {pop.exist ? <div className={styled.poperror}>
           <button type="button" class="btn btn-danger" >Youser Already exists.</button>
           </div> : null}
        </div>
    );
}