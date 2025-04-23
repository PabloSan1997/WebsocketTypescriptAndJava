import { HashRouter, useRoutes } from 'react-router-dom';
import { routesname } from './routesname';
import { Login } from '../layouts/Login';
import { Home } from '../layouts/Home';
import { Chat } from '../layouts/Chat';
import { Header } from '../Components/Header';



const RoutesComponent = () => useRoutes([
    {
        path: routesname.login,
        element: <Login />
    },
    {
        path: routesname.home,
        element: <Home />
    },
    {
        path: routesname.chat,
        element: <Chat />
    }
]);

export function RoutesIndex() {
    return (
        <HashRouter>
            <Header/>
            <RoutesComponent />
        </HashRouter>
    );
}
