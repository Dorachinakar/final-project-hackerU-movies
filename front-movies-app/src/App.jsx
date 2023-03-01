import "./App.css";
import ProtectedRoute from "./components/common/routhProtected";
import Footer from "./components/footer";
import Header from "./components/header";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import SignIn from "./components/pages/signin";
import SignUp from "./components/pages/signup";
import Logout from "./components/pages/logout";
import Movies from "./components/common/movies";
import Favorite from "./components/pages/favorite";
import CreateNote from "./components/cardFolder/createNote";
import MyNotes from "./components/pages/myNotes";
import DeleteNote from "./components/cardFolder/deleteNote";
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
          <Route path="/my-notes/delete/:id" element={<DeleteNote />} />
          <Route path="my-notes" element={<MyNotes />} />
          <Route path="my-notes/create-note" element={<CreateNote />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
