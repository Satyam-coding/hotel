import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {CreateContact} from './pages/CreateContact'
import {CreateContactScreen} from './pages/CreateContactScreen'
import {EditContactScreen}  from './pages/EditContactScreen'
import  {Map} from './pages/Map'
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateContact/>} />
        <Route path="/ccs" element={<CreateContactScreen/>} />
        <Route path="/ecs" element={<EditContactScreen/>} />
        <Route path="/map" element={<Map/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App