import { useEffect, useState } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Content from './components/Content'
import axios from 'axios'
import './App.css'

const API1 = "http://localhost:3000/menu"
const API2 = "http://localhost:3001/overview"

function App() {
  const [menu, setMenu] = useState([])
  const [overview, setOverview] = useState([])    

  useEffect(() => {
    const fetchData = async () => {
      try{
        const [menuRes, overviewRes] = await Promise.all([
          axios.get(API1),
          axios.get(API2),
        ]);
        setMenu(menuRes.data);
        setOverview(overviewRes.data);
      }catch(error){
        console.error("Error fetching data:", error)
      }
    }
    fetchData();
  },[])

  console.log("menu", menu)
  console.log("overview", overview)

  return (
    <div className='flex justify-center'>
      <div className="container">
        <Header/>
        <Content cardList={overview}/>
        <Menu listMenu={menu} />
      </div>
    </div>
  )
}

export default App
