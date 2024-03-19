import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
//import Remote1 from './components/remote' 
import Card from "app_components/Card";

import Update from './components/Update'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Update/>
    </>
  )
}

export default App
