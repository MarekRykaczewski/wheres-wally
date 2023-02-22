import './App.css';
import { GameWindow } from './components/GameWindow';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import level1 from "./img/level_1.jpg"
import level2 from "./img/level_2.jpg"

function App() {

  const levels = [{id: 1, url: level1}, {id: 2, url: level2}]

  return (
    <Router>
    <div className="App">
      <Nav />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home levels={levels} />}/>
          <Route path="/level/:id" element={<GameWindow/>} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
