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
import TransactionForm from './pages/Transactions/TransactionForm';
import UpdatePassword from './pages/User/UpdatePassword';
import AuthRoute from './components/Auth/AuthRoute';
import UpdateTransaction from './pages/Transactions/UpdateTransaction';


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

        {/* Using Higher Order Function(AuthRoute) to protect routes when user is not logged in */}
        <Route path='/dashboard' element={<AuthRoute><Dashboard/></AuthRoute>} />
        <Route path='/addCategory' element={<AuthRoute><AddCategory/></AuthRoute>} />
        <Route path='/categories' element={<AuthRoute><CategoriesList/></AuthRoute>} />
        <Route path='/update-category/:id' element={<AuthRoute><UpdateCategory/></AuthRoute>} />
        <Route path='/update-transaction/:id' element={<AuthRoute><UpdateTransaction/></AuthRoute>} />
        <Route path='/add-transaction' element={<AuthRoute><TransactionForm/></AuthRoute>} />
        <Route path='/update-password' element={<AuthRoute><UpdatePassword/></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
