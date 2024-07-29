import { useEffect, useState } from "react"
import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"
import axios from "axios"

export const Dashboard = () =>{
    const [value, setValue] = useState(0);
    useEffect( ()=>{
       axios.get("http://localhost:3000/api/v1/account/balance",
            {
                headers:{
                Authorization : "Bearer "+localStorage.getItem("token")
                }
            }
        )
         .then(response =>{
            setValue(response.data.balance)
         })
  },[])
    return<>
    <div>
        <div className="pt-3 pb-3">
     <Appbar/>
        </div>
     <Balance value={value} />
     <Users/>
    </div>
    </>
}