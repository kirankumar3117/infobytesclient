import { Route, Routes } from 'react-router-dom';
import './App.css';
import Allgames from './components/allgames';
import Gameplay from './components/gameplay';
import Login from './components/Login';
import Main from './components/Main';
import Playwith from './components/playwith';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path={"main"} element={<Main/>}/>
      <Route path={"login"} element={<Login/>}/>
      <Route path={"register"} element={<Signup/>}/>
      <Route path={"/"} element={<Allgames/>}/>
      <Route path={"playwith"} element={<Playwith/>}/>
      <Route path={"infobytes/game/:id"} element={<Gameplay/>}/>
    </Routes>    

    </div>
  );
}

export default App;
