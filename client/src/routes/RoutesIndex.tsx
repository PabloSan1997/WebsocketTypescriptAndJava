import { HashRouter, Navigate, useRoutes } from 'react-router-dom';
import { routesname } from './routesname';
import { Login } from '../layouts/Login';
import { Home } from '../layouts/Home';
import { Chat } from '../layouts/Chat';
import { Header } from '../Components/Header';
import { UseContext } from '../ContextProvider';

function ViewToken({ children }: Children) {
    const { token } = UseContext();
    if (!token.trim())
        return <Navigate to={routesname.login} />

    return (
        <>
            {children}
        </>
    );
}


const RoutesComponent = () => useRoutes([
    {
        path: routesname.login,
        element: <Login />
    },
    {
        path: routesname.home,
        element: (<ViewToken><Home /></ViewToken>)
    },
    {
        path: routesname.chat,
        element: (<ViewToken><Chat /></ViewToken>)
    },
    {
        path:'/',
        element:<Navigate to={routesname.home}/>
    }
]);

export function RoutesIndex() {
    return (
        <HashRouter>
            <Header />
            <RoutesComponent />
        </HashRouter>
    );
}
