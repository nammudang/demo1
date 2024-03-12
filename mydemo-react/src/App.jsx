import { useState } from 'react'
import Card from './components/card'
import Card2 from './components/Card2'
import './App.css'
import Uploadfile from './components/Upload'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Card/>
      <Card2/>
      <Uploadfile />
    </>
  )
}

export default App
