import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './screen/Login';
import Home from './screen/Home';
import Product from './screen/Product';
import Insert from './screen/Insert';
import Order from './screen/Order';
import Update from './screen/Update';

import {
  BrowserRouter as Router, Routes, Route,
  Navigate, Outlet
} from 'react-router-dom';
import { useState } from 'react';
// đọc thông tin user từ localStorage


function App() {
  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
    return null;
  }
  // lưu thông tin user vào localStorage
  const saveUserInfoToLocalStorage = (userInfo) => {
    if (!userInfo) {
      localStorage.removeItem('user');
      setUser(null);
    } else {
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    }
  }
  // state user
  const [user, setUser] = useState(getUserInfoFromLocalStorage());

  // các route không cần login
  const PublicRoute = () => {
    if (user) { // nếu đã login thì cho vào trang chủ
      return <Navigate to="/" />
    }
    return <Outlet /> // cho đi tiếp
  }

  // các route cần login
  const PrivateRoute = () => {
    if (!user) { // nếu chưa login thì cho vào trang login
      return <Navigate to="/login" />
    }
    return <Outlet />
  }
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route element={<PublicRoute/>}>
            <Route path="/login" element={<Login saveUser={saveUserInfoToLocalStorage} />} />
          </Route>

          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/order" element={<Order />} />
            
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
