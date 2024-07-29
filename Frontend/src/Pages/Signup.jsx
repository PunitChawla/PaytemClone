import { useState } from "react"
import { BottomWrapping } from "../Components/BottomWrapping"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputName } from "../Components/InputName"
import { Subheading } from "../Components/Subheading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
export const Signup = () =>{
  const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");   
    const [password, setPassword] = useState("");
 

    return <div className="bg-slate-300 h-screen flex justify-center">
       
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <Subheading label={"Enter your infromation to create an account"} />
        <InputName doChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />


        <InputName doChange={e => {
          setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />

        <InputName doChange={e => {
          setUsername(e.target.value);
        }} placeholder="xyz@gmail.com" label={"Email"} />


        <InputName doChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="minimum 6 digit password is required " label={"Password"} />
        <div className="pt-4">
        <Button 
        doClick={async () => {
            
           const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
               username,
               password,
               lastName,
               firstName
             });
             localStorage.setItem("token", response.data.token)
             navigate("/dashboard")
        }} 
        label={"Sign up"}  />
        </div>
        <BottomWrapping lable={"Already have an account?"} buttontext={"Sign in"} to={"/signin"} />
        
      </div>
    </div>
  </div>
}