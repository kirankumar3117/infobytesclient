
import styled from "../styles/Main.module.css"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";
export default function Main(){
    const navigate=useNavigate();

    useEffect(()=>{
        const get=localStorage.getItem(JSON.stringify("userid"));
        if(get){
            console.log(get)
        }
    })
    return (
        <div className={styled.Container}>
            <div className={styled.Tag}>
                async
            </div>
            <div className={styled.Projectname}>
                tic tac toe
            </div>
            <div className={styled.Login}>
            <button type="button" class="btn btn-primary" onClick={()=>
                navigate("/login")
            }>Login</button>
            </div>
            <div className={styled.Register}>
            <button type="button" class="btn btn-warning" onClick={()=>
                navigate("/register")}>Register</button>
            </div>
            
        </div>
    )
}