import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigator = useNavigate();
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>Topics</li>
      <li>
        <button
          onClick={() => {
            navigator(-1);
          }}
        >
          Back
        </button>
      </li>
    </ul>
  );
};

export default Nav;
