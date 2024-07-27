import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users =() =>{
    const[users, setUsers] = useState([]);
    const[filter , Setfilter] =  useState([]);
    useEffect( ()=>{
          axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
           .then(response =>{
            setUsers(response.data.user)
            console.log(response.data);
           })
    },[filter])
    return <>
    <div className="font-bold text-xl ">Users </div>  

    <div className="my-2">
        <input onChange={(e)=>{
            Setfilter(e.target.value)
        }} type="text" placeholder="Search user " className="w-full border rounded border-slate-300 px-2 py-2"/>
        </div>  

        <div>
            {users.map(user => <User user= {user} />)}
        </div>
    </>
}

function User({user})
{
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full w-36 mr-2">
            <Button doClick={(e)=>{
            navigate(`/send?id=${user._id}&name=${user.firstName}`);    
            }} label={"Send Money"} />
        </div>
    </div>
}