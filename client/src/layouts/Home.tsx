
import '../styles/home.scss';
import { UserHeader } from "../Components/UserHeader";
import { Link, useSearchParams } from 'react-router-dom';
import { routesname } from '../routes/routesname';
import { UseContext } from '../ContextProvider';
import { useQuery } from '@tanstack/react-query';
import { readApi } from '../api/readApi';


export function Home() {
    const [search] = useSearchParams();
    const searchpage = Number(search.get('page'));
    const page = isNaN(searchpage) ? 0 : searchpage;
    const {token}  = UseContext();

    const {data:lista} = useQuery({
        queryKey:['friend', token, page],
        queryFn:()=> readApi.findFriends(token, page),
        enabled:!!token.trim()
    });

    return (
        <div className="user_list">
            <h2>Lista de usuarios</h2>
            <div className="contenedor_list">
                {lista && lista.map(p => <UserHeader key={p.username} {...p} createdAt={undefined} isNavigate={true} />)}
            </div>
            <div className="area_button_menu">
                {page >= 1 && <Link to={`${routesname.home}?page=${page - 1}`}>-</Link>}
                <span>{page}</span>
                <Link to={`${routesname.home}?page=${page + 1}`}>+</Link>
            </div>
        </div>
    );
}
