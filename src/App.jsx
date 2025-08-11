import React from 'react'
import { Navbar,Footer } from './components/index'
import { Route,Routes } from 'react-router-dom'
import {Home,Coin} from './pages/index'
import { useParams } from 'react-router-dom'
const App = () => {

  const {coinId} = useParams()
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App