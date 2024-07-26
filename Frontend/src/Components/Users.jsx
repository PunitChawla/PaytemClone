import { useState } from "react";
import { Button } from "./Button";

export const Users =() =>{
    const[users, setUsers] = useState([{
        firstname : "Punit",
        lastname : "chawla",
        id : 1
    },
    {
        firstname : "Pushpa",
        lastname : "chawla",
        id : 1
    },
    {
        firstname : "Nilesh",
        lastname : "chawla",
        id : 1
    },
    {
        firstname : "Rishu",
        lastname : "chawla",
        id : 1
    },
])

    return <>
    <div className="font-bold text-xl ">Users </div>  

    <div className="my-2">
        <input type="text" placeholder="Search user " className="w-full border rounded border-slate-300 px-2 py-2"/>
        </div>  

        <div>
            {users.map(user => <User user= {user} />)}
        </div>
    </>
}

function User({user})
{
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                {user.firstname} {user.lastname}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full w-36 mr-2">
            <Button label={"Send Money"} />
        </div>
    </div>
}