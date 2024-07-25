import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"

export const Dashboard = () =>{
    return<>
    <div>
     <Appbar/>
     <Balance value={"10000"} />
    </div>
    </>
}