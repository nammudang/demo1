import { useState } from 'react'
import Card from './components/card'
import './App.css'
import Uploadfile from './components/Upload'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Card/>
      <Uploadfile />
    </>
  )
}

export default App
