import { readApi } from "../api/readApi";
import { UseContext } from "../ContextProvider";
import { UserHeader } from "./UserHeader";


export function MesssageComponent({ id, message, user, createdAt }: MessageDto) {
    const { userinfo, token } = UseContext();
    return (
        <div className={userinfo.username == user.username ? 'message_component ismainuser' : 'message_component'} id={`idm${id}`}>
            <UserHeader {...user} createdAt={createdAt} isNavigate={false} />
            <p className="message">{message}</p>
            {
                userinfo.username == user.username && (<button onClick={() => {
                    if (confirm('Seguro que desea borrar este mensaje?'))
                        readApi.deleteMessage(token, id);
                }}>X</button>)
            }

        </div>
    );
}
