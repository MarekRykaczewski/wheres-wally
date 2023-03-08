import './App.css';
import { GameWindow } from './components/GameWindow';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { Leaderboard } from './components/Leaderboard';
import { auth, googleProvider } from "./config/firebase"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"

function App() {

  const initialClientLevelsData = [
    {id: 1, 
    url: "level_1.jpg", 
    characters: { 
        wally: {id: 1, found: false, url: `../wally.png` }, 
        odlaw: {id: 2, found: false, url: `../odlaw.png`}, 
        wizard: {id: 3,found: false, url: `../wizard.png`}
      } 
    }, 
    {id: 2,
       url: "level_2.jpg", 
       characters: { 
        wally: {id: 1, found: false, url: `../wally.png` }, 
        odlaw: {id: 2, found: false, url: `../odlaw.png`}, 
        wizard: {id: 3, found: false, url: `../wizard.png`}, 
        wilma: {id: 4, found: false, url: `../wilma.png`}
      } 
    },
    {id: 3, 
      url: "level_3.jpg", 
      characters: { 
        wally: {id: 1, found: false, url: `../wally.png` }
      } 
    },
    {id: 4, 
      url: "level_4.jpg", 
      characters: { 
        wally: {id: 1, found: false, url: `../wally.png` }, 
        odlaw: {id: 2, found: false, url: `../odlaw.png`}, 
        wizard: {id: 3, found: false, url: `../wizard.png`}, 
        wilma: {id: 4, found: false, url: `../wilma.png`}
      } 
    },
    {id: 5, 
      url: "level_5.jpg", 
      characters: { 
        wally: {id: 1, found: false, url: `../wally.png` }, 
        odlaw: {id: 2, found: false, url: `../odlaw.png`}, 
        wizard: {id: 3, found: false, url: `../wizard.png`}
      } 
    },
    {id: 6, 
      url: "level_6.jpg", 
      characters: { 
        wally: {id: 1, found: false, url: `../wally.png` }, 
        odlaw: {id: 2, found: false, url: `../odlaw.png`}, 
        wizard: {id: 3, found: false, url: `../wizard.png`}
      } 
    }
  ]

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [profilePicUrl, setProfilePicUrl] = useState("")
  const [serverLevelsData, setServerLevelsData] = useState([])
  const [clientLevelsData, setClientLevelsData] = useState(initialClientLevelsData)

  useEffect(() => {
    const getServerLevelsData = async () => {
      const levelsServerRef = collection(db, "levels")
      const serverLevelsData = await getDocs(levelsServerRef)
      const filteredData = serverLevelsData.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setServerLevelsData(filteredData)
    }
    getServerLevelsData()
  }, [])

  useEffect(()=> {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setUsername(currentUser.displayName)
      setProfilePicUrl(currentUser.photoURL)
    })
  }, [])

  const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider)
      .then((result) => {
          const user = result.user

          setUser(user)
          setUsername(user.displayName)
          setProfilePicUrl(user.photoURL)
      })
  }

  const logOut = async () => {
      try {
          await signOut(auth)
          setUsername("")
          setProfilePicUrl("")
      } catch (err) {
          console.error(err)
      }
  }

  const resetClientLevelsData = () => {
    setClientLevelsData(initialClientLevelsData)
  }

  const handleCharacterClick = (character, clientX, clientY, id) => {
    const clientCoordinates = {x: clientX, y: clientY}
    const { x, y } = serverLevelsData[+id - 1].characters[character].coordinates
    const serverCoordinates = {x, y}
    console.log("client click")
    console.log(clientCoordinates)
    console.log("server loc")
    console.log(serverCoordinates)
    if (isNear(clientCoordinates.x, serverCoordinates.x) && isNear(clientCoordinates.y, serverCoordinates.y)) {
        const itemToUpdate = clientLevelsData.findIndex(x => x.id == id)
        const oldData = [...clientLevelsData]
        const newData = oldData[itemToUpdate].characters[character].found = true
        setClientLevelsData(oldData, newData)
        console.log(clientLevelsData)
    } else {
        console.log("miss")
    }
}

const isNear = (a, b) => {
    if (a < b+2) {
        return true
    } else {
        return false
    }
}

  return (
    <Router>
    <div className="App">
      <Nav 
        username={username}
        profilePicUrl={profilePicUrl}
        signInWithGoogle={signInWithGoogle}
        logOut={logOut}
      />
        <Routes>
          <Route 
          path="/leaderboard" 
          element={<Leaderboard levels={clientLevelsData}/>}
           />
          <Route 
          path="/" 
          element={<Home levels={clientLevelsData}/>}
           />
          <Route 
          path="/level/:id" 
          element={<GameWindow username={username} resetClientLevelsData={resetClientLevelsData} clientLevelsData={clientLevelsData} serverLevelsData={serverLevelsData} handleCharacterClick={handleCharacterClick}/>} 
          />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
