import { Link, Navigate} from "react-router-dom";
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Dashboard } from './Pages/Dashboard'
import { Sendmoney } from './Pages/Sendmoney'
function App() {
  

  return (
    <>
    {/* <Link to={'/signup'}></Link> */}
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Navigate to= '/signup' />} />
    <Route path='/signup' element = {<Signup />} />
    <Route path='/signin' element = {<Signin/>} />
    <Route path='/dashboard' element = {<Dashboard/>}/>
    <Route path='/send' element = {<Sendmoney/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
