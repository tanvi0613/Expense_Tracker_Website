import './App.css';
import AnimatedCursor from 'react-animated-cursor';
import {useSelector} from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard';
import AddCategory from './pages/Category/AddCategory';
import CategoriesList from './pages/Category/CategoriesList';
import UpdateCategory from './pages/Category/UpdateCategory';


function App() {
  const user = useSelector((state) => state?.auth.user)
  console.log(user);

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
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addCategory' element={<AddCategory />} />
        <Route path='/categories' element={<CategoriesList />} />
        <Route path='/update-category/:id' element={<UpdateCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
