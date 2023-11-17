import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Header from './components/Header';
import Login from './views/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Register from './views/Register';
import Home from './views/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
