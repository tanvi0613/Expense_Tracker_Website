import './App.css';
import AnimatedCursor from 'react-animated-cursor';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { getUserFromStorage } from './utils/getUserFromStorage';


function App() {
  //get the token
  const token = getUserFromStorage();
  console.log(token)

  return (
    <BrowserRouter>
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="50, 50, 50"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
