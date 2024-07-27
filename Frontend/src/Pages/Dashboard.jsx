import { useState } from "react"
import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"
import axios from "axios"
export const Dashboard = async () =>{
    const [value,setValue] = useState(0);
   const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
        headers:{
          Authorization : "Bearer "+localStorage.getItem("token")
        }
      })

      setValue(response.data.value)
    return<>
    <div>
     <Appbar/>
     <Balance value={value} />
     <Users/>
    </div>
    </>
}