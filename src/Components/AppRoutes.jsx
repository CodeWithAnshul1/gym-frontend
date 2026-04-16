import React from 'react'
import { Routes,Route} from 'react-router-dom'
import AddClints from './AddClints'
import Clints from './Clints'
import Users from './Users'
import UpdateUser from './UpdateUser'
import PrivateRoutes from './PrivateRoutes'
import ProtectRoutes from './ProctectRoutes'
import Loggin from "./Loggin"
import Createacc from './Createacc'
import Revenue from './Revenue'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Loggin />} />
        <Route path="/createacc" element={<Createacc/>}/>

        
        <Route path="/Add" element={ 
          
            <ProtectRoutes><AddClints/>
            </ProtectRoutes> 
          }/>
        
        <Route path="/clint" element={
          <PrivateRoutes><Clints/></PrivateRoutes>}/>
          <Route path="/user" element={
         <ProtectRoutes><Users/></ProtectRoutes> }/>

        <Route path="/update/:id" element={
          <PrivateRoutes><UpdateUser /></PrivateRoutes>}/>

        <Route path="/revenue" element={<ProtectRoutes><Revenue/></ProtectRoutes>}/>
                
    </Routes>
  );
}
