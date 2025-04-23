import { Link } from "react-router-dom";
import { routesname } from "../routes/routesname";
import '../styles/userheader.scss';

interface UserHeaderComponent extends UserHeader {
    createdAt: string | undefined | null;
    isNavigate: boolean;
}



interface ActivateNavigateInterface extends Children {
    isNavigate: boolean;
    username: string;
}

export function UserHeader({ username, nickname, urlImage, createdAt, isNavigate }: UserHeaderComponent) {

    return (
        <ActivateNavigate isNavigate={isNavigate} username={username}>
            <img src={urlImage} alt={username} />
            <div className="area_info">
                <span className="nickname">{nickname}</span>
                {isNavigate ? <span className="username">@{username}</span>:null}
                {createdAt?.trim() ?
                    (<span className="create_at">{new Date(createdAt).toLocaleString()}</span>)
                    : null}
            </div>
        </ActivateNavigate>
    );
}

function ActivateNavigate({ children, isNavigate, username }: ActivateNavigateInterface) {

    if (isNavigate)
        return (
            <Link className="userheader isnavigate" to={`${routesname.chat}?userfriend=${username}`}>
                {children}
            </Link>
        );

    return (
        <div className="userheader">
            {children}
        </div>
    )
}
