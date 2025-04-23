import React from "react";

const initialState:LoginDto = {
  username: "",
  password: ""
}

export function LoginForm() {

  const [data, setData] = React.useState<LoginDto>(initialState);

  return (
    <form className="login">
      <h2>Iniciar Seccion</h2>
      <label htmlFor="usernamelogin">Username</label>
      <input
        type="text"
        id="usernamelogin"
        placeholder="Escribir"
        value={data.username}
        onChange={e => setData(d => ({ ...d, username: e.target.value }))}
      />

      <label htmlFor="passwordlogin">Password</label>
      <input
        type="password"
        placeholder="Escribir"
        id="passwordlogin"
        value={data.password}
        onChange={e => setData(d => ({ ...d, password: e.target.value }))}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
