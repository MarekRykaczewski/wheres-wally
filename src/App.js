import './App.css';
import { GameWindow } from './components/GameWindow';
import { Nav } from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className='main'>
        <GameWindow />
      </div>
    </div>
  );
}

export default App;
