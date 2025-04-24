
import '../styles/home.scss';
import { UserHeader } from "../Components/UserHeader";
import { Link, useSearchParams } from 'react-router-dom';
import { routesname } from '../routes/routesname';

const lista:UserHeader[]= [
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    },
    {
        username: "pablo123",
        nickname: "Jose Pablo",
        urlImage: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg"
    },
    {
        username:'Juan485',
        nickname:'Juana la iguana',
        urlImage:'https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg'
    }
]

export  function Home() {
    const [search] = useSearchParams();
    const searchpage = Number(search.get('page'));
    const page = isNaN(searchpage)?0:searchpage;
  return (
    <div className="user_list">
        <h2>Lista de usuarios</h2>
        <div className="contenedor_list">
            {lista.map(p => <UserHeader key={p.username} {...p} createdAt={undefined} isNavigate={true}/>)}
        </div>
       <div className="area_button_menu">
        {page >= 1 && <Link to={`${routesname.home}?page=${page-1}`}>-</Link>}
        <span>{page}</span>
        <Link to={`${routesname.home}?page=${page+1}`}>+</Link>
       </div>
    </div>
  );
}
