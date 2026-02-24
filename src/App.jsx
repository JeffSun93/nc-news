import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser("abc");
  }, []);

  return (
    <>
      <header>
        <p>{user}</p>
      </header>
      <main></main>
      <footer>
        created <a href="https://github.com/JeffSun93">Jeff</a>
      </footer>
    </>
  );
}

export default App;
