import "./App.css";
import NavBar from "./components/navbar";
import Music from "./pages/music";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Connect from "./pages/connect";
import Performances from "./pages/performances";
import { Route, Routes } from "react-router-dom";



function App() {

    return (
        <>
        <NavBar />
        <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/connect" element = {<Connect/>}/>
            <Route path = "/profile" element = {<Profile/>}/>
            <Route path = "/performances" element = {<Performances/>}/>
            <Route path = "/music" element = {<Music/>}/>
        </Routes>
        </>
    );
}

export default App;
