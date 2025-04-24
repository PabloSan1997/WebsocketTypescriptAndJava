import '../styles/header.scss';
import { Link } from "react-router-dom";
import { routesname } from "../routes/routesname";

export function Header() {
  return (
    <header>
        <h1><Link to={routesname.home}>Mi Chat</Link></h1>
        <button>Log out</button>
    </header>
  );
}
