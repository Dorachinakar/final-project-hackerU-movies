import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import React from "react";
import { Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import SignIn from "./components/pages/signin";
import SignUp from "./components/pages/signup";
import Logout from "./components/pages/logout";
import Movies from "./components/common/movies";
function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <header>
        <Header />
      </header>
      <main className="container flex-fill ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn redirect="/" />} />
          <Route path="/signup" element={<SignUp redirect="/" />} />
          <Route path="/logout" element={<Logout redirect="/signin" />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
