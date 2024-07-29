import { useState } from "react"
import { BottomWrapping } from "../Components/BottomWrapping"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputName } from "../Components/InputName"
import { Subheading } from "../Components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () =>{
    
    const[username, SetName] = useState("");
    const[password, setPassword] = useState("");
    const nevigate = useNavigate();
    return<div className="bg-slate-300 flex justify-center h-screen">

     
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max px-4">
                <Heading label={"Sign in"} />
                <Subheading label={"Enter Your credentials to access your account "} />
                <InputName doChange={e => {
                SetName(e.target.value);
                }} title={"Email"} placeholder={"xyz@gmail.com"}/>
                <InputName doChange={e =>{
                    setPassword(e.target.value);
                }} title={"password"} placeholder= {"Enter your password "}/>
                <Button doClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    })
                    try {
                        localStorage.setItem("token", response.data.token);
                        nevigate("/dashboard")
                    } catch (error) {
                        localStorage.setItem("error" , response.data.message);
                    }
                }} label={"Sign in"} />
                <BottomWrapping lable={"Don't have any account ?"} buttontext={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}