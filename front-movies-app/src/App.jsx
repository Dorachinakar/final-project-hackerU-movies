import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import React from "react";
import { Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
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
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
