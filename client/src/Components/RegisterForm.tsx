import React from "react";
import { UseContext } from "../ContextProvider";

const initialState: RegisterDto = {
    username: "",
    password: "",
    nickname: "",
    urlImage: ""
}

export function RegisterForm() {
    const {register} = UseContext();
    const [data, setData] = React.useState<RegisterDto>(initialState);
    const submit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(data.username.trim() && data.password.trim()){
          register(data);
        }
      }
    return (
        <form className="register" onSubmit={submit}>
            <h2>Registrarse</h2>
            <label htmlFor="usernameregister">Username</label>
            <input
                type="text"
                id="usernameregister"
                placeholder="Escribir"
                value={data.username}
                onChange={e => setData(d => ({ ...d, username: e.target.value }))}
            />

            <label htmlFor="passwordregister">Password</label>
            <input
                type="password"
                id="passwordregister"
                placeholder="Escribir"
                value={data.password}
                onChange={e => setData(d => ({ ...d, password: e.target.value }))}
            />

            <label htmlFor="nicknameregister">Nickname</label>
            <input
                type="text"
                id="nicknameregister"
                placeholder="Escribir"
                value={data.nickname}
                onChange={e => setData(d => ({ ...d, nickname: e.target.value }))}
            />

            <label htmlFor="urlimageregister">url image</label>
            <textarea
                id="urlimageregister"
                placeholder="Escribir"
                value={data.urlImage}
                onChange={e => setData(d => ({ ...d, urlImage: e.target.value }))}
            ></textarea>

            <button type="submit">Entrar</button>
        </form>
    );
}
