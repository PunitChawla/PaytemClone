import { BottomWrapping } from "../Components/BottomWrapping"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputName } from "../Components/InputName"
import { Subheading } from "../Components/Subheading"

export const Signup = () =>{
    return<div className="bg-slate-300 flex justify-center h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center h-max px-4">
                <Heading label={"Sign up"} />
                <Subheading label={"Enter more information for Sign up "} />
                <InputName title={"First Name"} placeholder={"John"} />
                <InputName title={"Last Name"} placeholder={"Doe"}/>
                <InputName title={"Email"} placeholder={"xyz@gmail.com"}/>
                <InputName title={"password"} placeholder= {"1234545"}/>
                <Button label={"Sign up"} />
                <BottomWrapping lable={"Already have an account ?"} buttontext={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}