import './App.css';
import { GameWindow } from './components/GameWindow';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

function App() {

  let clientLevelsData = [
    {id: 1, url: "level_1.jpg", characters: { name: "wally", found: false }}, 
    {id: 2, url: "level_2.jpg"},
    {id: 3, url: "level_3.jpg"}
  ]

  const getServerLevelsData = async () => {
    const levelsServerRef = collection(db, "levels")
    const serverLevelsData = await getDocs(levelsServerRef)
    const filteredData = serverLevelsData.docs.map((doc) => ({...doc.data(), id: doc.id}))
    console.log(filteredData)
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
          element={<GameWindow getServerLevelsData={getServerLevelsData}/>} 
          />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
