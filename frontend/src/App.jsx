import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import DashBoard from "./pages/DashBoard";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/projects" element={<Projects/>}></Route>
      <Route path="/dashboard" element={<DashBoard/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}