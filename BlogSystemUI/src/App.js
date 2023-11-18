import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Header from './components/Header';
import Login from "./views/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from "./views/Register";
import Home from "./views/Home";
import { AuthProvider } from "./components/context/AuthContext";
import PostCreationForm from "./views/AddPost";
import UpdatePost from "./views/UpdatePost";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Addpost" element={<PostCreationForm />} />
        <Route path="/Updatepost/:postId" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
