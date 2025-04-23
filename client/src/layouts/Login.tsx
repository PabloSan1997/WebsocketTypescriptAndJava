import React from "react";
import { RegisterForm } from "../Components/RegisterForm";
import { LoginForm } from "../Components/LoginForm";
import '../styles/login.scss';


export function Login() {
    const [styles, setSytles] = React.useState<React.CSSProperties>({
        margin:'0'
    });

    const setlogin = () => {
        setSytles({margin:'0'});
    }
    const setsignup = ()=>{
        setSytles({marginLeft:'-100%'});
    }

    return (
        <div className="area_res">
            <h2>Log in / Sign up</h2>
            <div className="area_buttons">
                <button onClick={setlogin}>Login</button><button onClick={setsignup}>Sign up</button>
            </div>
            <div className="area_form">
                <div className="area_slider" style={styles}>
                    <LoginForm />
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
