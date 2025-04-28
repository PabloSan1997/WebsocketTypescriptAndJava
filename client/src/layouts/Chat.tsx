/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSearchParams } from "react-router-dom";
import { MesssageComponent } from "../Components/MesssageComponent";
import '../styles/areachat.scss';
import { useQuery } from "@tanstack/react-query";
import { UseContext } from "../ContextProvider";
import { readApi, urlbase } from "../api/readApi";
import { io } from 'socket.io-client';
import { logstorage } from "../storage/logstorage";


const socket = io(urlbase.socket, { auth: { jwt: logstorage.read() } });
export function Chat() {
  const { token } = UseContext();
  const [search] = useSearchParams();
  const ref = React.useRef<null | HTMLDivElement>(null);
  const [mes, setMes] = React.useState('');
  const usersearch = search.get('userfriend');
  const userfriend = usersearch ?? '';
  const [messages, setMessages] = React.useState<MessageDto[]>([]);


  React.useEffect(() => {

    socket.on('mes', (mess: MessageDto) => {
      setMessages(m => [...m, mess]);
    });
    socket.on('mesdelete', (data: { id: number }) => {
      setMessages(m => {
        const clon = [...m];
        const i = clon.findIndex(d => d.id == data.id);
        if (i > -1) {
          clon.splice(i, 1);
          return clon;
        }
        return m;
      });
    });

    return () => {
      socket.off('mes');
    }
  }, [token]);

  const { data: datamessage } = useQuery({
    queryKey: ['mes', token, userfriend],
    queryFn: () => readApi.findMessage(token, userfriend),
    enabled: !!token.trim()
  });

  React.useEffect(() => {
    const view = ref.current;
    if (view && messages.length > 0) {
      view.scrollTo({ top: view.scrollHeight, behavior: 'smooth' })
    }
  }, [ref.current?.scrollHeight, messages.length]);

  React.useEffect(() => {
    if (datamessage && datamessage.length > 0 && messages.length == 0) {
      setMessages(datamessage);
    }
  }, [datamessage, datamessage?.length]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mes.trim()) {
      const data: { savemessage: SaveMessageDto, userfriend: string } = {
        savemessage: { message: mes },
        userfriend
      }
      socket.emit('mes', data);
      setMes('');
    }
  }

  return (
    <div className="area_chat">
      <h2>Hablar con: {userfriend}</h2>
      <div className="screen" ref={ref}>
        {messages.map(p => <MesssageComponent key={p.id} {...p} />)}
      </div>
      <form className="sendmessage" onSubmit={submit}>
        <textarea value={mes} onChange={e => setMes(e.target.value)} placeholder="Mensaje..."></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
