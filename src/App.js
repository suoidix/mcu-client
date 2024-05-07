import './App.css'
import AllCharacters from './AllCharacters';
import CreateCharacter from './CreateCharacter';
import { Routes, Route, Link } from 'react-router-dom';
import OneCharacter from './OneCharacter';

function App() {

  return ( 
    <div className="App">
      <h1>This is MCU App</h1>
      <nav>
        <ul style={{ listStyle: 'none'}}>
        <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/mcu">
              See All Characters
            </Link>
          </li>
          <li>
            <Link to="/mcu/create">
              Create a new MCU character
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/mcu" element={<AllCharacters />}/>
        <Route path="/mcu/create" element={<CreateCharacter />}/>
        <Route path="/mcu/:name" element={<OneCharacter />}/>
      </Routes>
    </div>
  );
}

export default App;