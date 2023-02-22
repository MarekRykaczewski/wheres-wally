import './App.css';
import { GameWindow } from './components/GameWindow';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const levels = [
    {id: 1, url: "level_1.jpg"}, 
    {id: 2, url: "level_2.jpg"},
    {id: 3, url: "level_3.jpg"}
  ]

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
