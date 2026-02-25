import { Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import ArticlesView from "./components/ArticlesView.jsx";
import Header from "./components/Header.jsx";
import { CurrentUserProvider } from "./contexts/CurrentUser.jsx";

function App() {
  axios.defaults.baseURL = "https://jeff-nc-news.onrender.com";

  return (
    <CurrentUserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesView />} />
        <Route path="/articles" element={<ArticlesView />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
      <footer>
        created <a href="https://github.com/JeffSun93">Jeff</a>
      </footer>
    </CurrentUserProvider>
  );
}

export default App;
