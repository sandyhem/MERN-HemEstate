import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Privateroute from "./components/Privateroute";
import CreateListing from "./pages/CreateListing";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route element={<Privateroute/>}>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path='/create' element={<CreateListing/>}> </Route>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}