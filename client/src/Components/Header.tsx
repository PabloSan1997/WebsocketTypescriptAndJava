import '../styles/header.scss';
import { Link } from "react-router-dom";
import { routesname } from "../routes/routesname";
import { UseContext } from '../ContextProvider';

export function Header() {
  const { token, logout, userinfo } = UseContext();
  return (
    <header>
      <h1><Link to={routesname.home}>Mi Chat</Link></h1>
      {token.trim() && (
        <>
            <span className='headerusername'>{userinfo.username}</span>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </header>
  );
}
