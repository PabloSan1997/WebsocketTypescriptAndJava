/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MesssageComponent } from "../Components/MesssageComponent";
import '../styles/areachat.scss';
import { useQuery } from "@tanstack/react-query";
import { UseContext } from "../ContextProvider";
import { readApi, urlbase } from "../api/readApi";
import { Client } from '@stomp/stompjs';


export function ChatStomp() {
  const { token } = UseContext();
  const [search] = useSearchParams();
  const ref = React.useRef<null | HTMLDivElement>(null);
  const [mes, setMes] = React.useState('');
  const usersearch = search.get('userfriend');
  const userfriend = usersearch ?? '';
  const [messages, setMessages] = React.useState<MessageDto[]>([]);
  const stompClient = useMemo(() => new Client(), []);


  React.useEffect(() => {
    stompClient.brokerURL = `${urlbase.socket}/chatservice?jwt=${token}`;
    stompClient.onConnect = (frame) => {
      console.log(frame.command);

      stompClient.subscribe(`/user/chat/person/${userfriend}`, data => {
        const messagedto: MessageDto = JSON.parse(data.body);
        setMessages(m => [...m, messagedto]);
      });

      stompClient.subscribe('/user/chat/deletemessage', data => {
        const idimage: { id: number } = JSON.parse(data.body);
        setMessages(m => {
          const messa = [...m];
          const index = messa.findIndex(p => p.id == idimage.id);
          if (index > -1) {
            messa.splice(index, 1);
          }
          return messa;
        });
      })

    }
    if (token.trim())
      stompClient.activate();
    return () => {
      stompClient.unsubscribe(`/user/chat/${userfriend}`);
      stompClient.unsubscribe('/user/chat/deletemessage');
      stompClient.deactivate();
    }
  }, [token, userfriend]);

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
      const data: StompMessage = {
        userfriend: userfriend,
        message: mes
      }
      console.log(data);
      stompClient.publish({
        destination:'/app/chat',
        body:JSON.stringify(data)
      });
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
