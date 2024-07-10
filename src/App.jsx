import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter >
        <Header/> 
        <Main />
      </BrowserRouter >
      <Footer />
    </>
  )
}

export default App
