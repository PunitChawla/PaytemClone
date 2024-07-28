import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"

export const Dashboard = () =>{
    return<>
    <div>
     <Appbar/>
     <Balance value={"10000"} />
     <Users/>
    </div>
    </>
}