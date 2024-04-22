import { useState  } from 'react'
import { useSelector } from 'react-redux'
import HomePage from './Homepage/HomePage'

function App() {
//   const [count, setCount] = useState(0)
  const username = useSelector((state) => state.user.username);
  console.log("username is : ",username);
  return (
    <>
      {/* <Header/>
      <div style={{display: 'flex'}}>  
        <Navbar/> 
        <CardOne/>
        <CardTwo/> 
      </div>
      <Footer/>  */}
      <HomePage />
    </>
  )
}

export default App