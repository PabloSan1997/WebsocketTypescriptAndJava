import React from "react";
import { useSearchParams } from "react-router-dom";
import { MesssageComponent } from "../Components/MesssageComponent";
import '../styles/areachat.scss';

const messages: MessageDto[] = [
  {
    id: 1,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 2,
    message: 'Hola a todos',
    user: {
      username: "juan123",
      nickname: "josepablo",
      urlImage: "https://img.freepik.com/vector-gratis/ilustracion-simio-estilo-nft-dibujado-mano_23-2149622021.jpg?semt=ais_hybrid&w=740"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 3,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 4,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 15,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 24,
    message: 'Hola a todos',
    user: {
      username: "juan123",
      nickname: "josepablo",
      urlImage: "https://img.freepik.com/vector-gratis/ilustracion-simio-estilo-nft-dibujado-mano_23-2149622021.jpg?semt=ais_hybrid&w=740"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 35,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 46,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  },
  {
    id: 47,
    message: 'Hola a todos',
    user: {
      username: "pablo123",
      nickname: "josepablo",
      urlImage: "https://i.pinimg.com/236x/93/a5/f5/93a5f52445124a6b9240def840003a05.jpg"
    },
    createdAt: '04-02-1785'
  }
];

export function Chat() {
  const [search] = useSearchParams();
  const ref = React.useRef<null | HTMLDivElement>(null);
  const [mes, setMes] = React.useState('');
  const usersearch = search.get('userfriend');
  const userfriend = usersearch ?? '';

  React.useEffect(() => {
    const view = ref.current;
    if (view) {
      view.scrollTo({ top: view.scrollHeight, behavior: 'smooth' })
    }
  }, [ref.current?.scrollHeight]);


  return (
    <div className="area_chat">
      <h2>Hablar con: {userfriend}</h2>
      <div className="screen" ref={ref}>
        {messages.map(p => <MesssageComponent key={p.id} {...p} />)}
      </div>
      <form className="sendmessage">
        <textarea value={mes} onChange={e => setMes(e.target.value)} placeholder="Mensaje..."></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
