import React from "react";
import { RegisterForm } from "../Components/RegisterForm";
import { LoginForm } from "../Components/LoginForm";
import '../styles/login.scss';
import { UseContext } from "../ContextProvider";
import { Navigate } from "react-router-dom";
import { routesname } from "../routes/routesname";


export function Login() {
    const [styles, setSytles] = React.useState<React.CSSProperties>({
        marginLeft: '0'
    });
    const { token } = UseContext();

    const setlogin = () => {
        setSytles({ marginLeft: '0' });
    }
    const setsignup = () => {
        setSytles({ marginLeft: '-100%' });
    }


    if (token.trim()) {
        return <Navigate to={routesname.home} />
    }
    return (
        <div className="area_res">
            <h2>Log in / Sign up</h2>
            <div className="area_buttons">
                <button onClick={setlogin} className={`${styles.marginLeft == '0' && 'activado'}`}>Login</button>
                <button onClick={setsignup} className={`${styles.marginLeft != '0' && 'activado'}`}>Sign up</button>
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
