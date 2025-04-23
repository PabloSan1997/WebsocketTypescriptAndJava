import React from "react";

const initialState:RegisterDto = {
    username: "",
    password: "",
    nickname: "",
    urlImage: ""
}

export function RegisterForm() {
    const [data, setData] = React.useState<RegisterDto>(initialState);
    return (
        <form className="register">
            <h2>Registrarse</h2>
            <label htmlFor="usernameregister">Username</label>
            <input
                type="text"
                id="usernameregister"
                value={data.username}
                onChange={e => setData(d => ({...d, username:e.target.value}))}
            />

            <label htmlFor="passwordregister">Password</label>
            <input
                type="text"
                id="passwordregister"
                value={data.password}
                onChange={e => setData(d => ({...d, password:e.target.value}))}
            />

            <label htmlFor="nicknameregister">Nickname</label>
            <input
                type="text"
                id="nicknameregister"
                value={data.nickname}
                onChange={e => setData(d => ({...d, nickname:e.target.value}))}
            />

            <label htmlFor="urlimageregister">url image</label>
            <textarea
                id="urlimageregister"
                value={data.urlImage}
                onChange={e => setData(d => ({...d, urlImage:e.target.value}))}
            ></textarea>

            <button type="submit">Entrar</button>
        </form>
    );
}
