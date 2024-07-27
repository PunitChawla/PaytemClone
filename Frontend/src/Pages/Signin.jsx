import { BottomWrapping } from "../Components/BottomWrapping"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputName } from "../Components/InputName"
import { Subheading } from "../Components/Subheading"

export const Signin = () =>{
    
    return<div className="bg-slate-300 flex justify-center h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max px-4">
                <Heading label={"Sign in"} />
                <Subheading label={"Enter Your credentials to access your account "} />
                <InputName title={"Email"} placeholder={"xyz@gmail.com"}/>
                <InputName title={"password"} placeholder= {""}/>
                <Button label={"Sign in"} />
                <BottomWrapping lable={"Don't have any account ?"} buttontext={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}