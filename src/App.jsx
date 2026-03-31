import { Routes, Route } from "react-router-dom";
import axios from "axios";

import MainLayout from "./layouts/MainLayout.jsx";

import Articles from "./features/articles/routes/Articles.jsx";
import Article from "./features/articles/routes/Article.jsx";
import { CurrentUserProvider } from "./features/user/components/CurrentUser.jsx";

import { API_URL } from "./constants.js";

axios.defaults.baseURL = API_URL;

function App() {
  return (
    <CurrentUserProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Articles />
            </MainLayout>
          }
        />
        <Route
          path="/articles"
          element={
            <MainLayout>
              <Articles />
            </MainLayout>
          }
        />
        <Route
          path="/articles/:article_id"
          element={
            <MainLayout>
              <Article />
            </MainLayout>
          }
        />
      </Routes>
    </CurrentUserProvider>
  );
}

export default App;
