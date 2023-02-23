import './App.css';
import { GameWindow } from './components/GameWindow';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import { useEffect, useState } from 'react';

function App() {

  const [serverLevelsData, setServerLevelsData] = useState([])

  useEffect(() => {
    const getServerLevelsData = async () => {
      const levelsServerRef = collection(db, "levels")
      const serverLevelsData = await getDocs(levelsServerRef)
      const filteredData = serverLevelsData.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setServerLevelsData(filteredData)
    }
    getServerLevelsData()
  }, [])

  let clientLevelsData = [
    {id: 1, url: "level_1.jpg", charactersFound: { wally: false}}, 
    {id: 2, url: "level_2.jpg"},
    {id: 3, url: "level_3.jpg"}
  ]

  console.log(serverLevelsData)


  const handleCharacterClick = (character, clientX, clientY, id) => {
    const clientCoordinates = {x: clientX, y: clientY}
    const { x, y } = serverLevelsData[0].characters[character].coordinates
    const serverCoordinates = {x, y}
    console.log("client click")
    console.log(clientCoordinates)
    console.log("server loc")
    console.log(serverCoordinates)
    if (isNear(clientCoordinates.x, serverCoordinates.x) && isNear(clientCoordinates.y, serverCoordinates.y)) {
        const itemToUpdate = clientLevelsData.findIndex(x => x.id == id)
        clientLevelsData[itemToUpdate].charactersFound[character] = true
        console.log(clientLevelsData)
    } else {
        console.log("miss")
    }
}

const isNear = (a, b) => {
    if (a < b+5) {
        return true
    } else {
        return false
    }
}

  return (
    <Router>
    <div className="App">
      <Nav />
      <div className='main'>
        <Routes>
          <Route 
          path="/" 
          element={<Home levels={clientLevelsData}/>}
           />
          <Route 
          path="/level/:id" 
          element={<GameWindow serverLevelsData={serverLevelsData} handleCharacterClick={handleCharacterClick}/>} 
          />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
