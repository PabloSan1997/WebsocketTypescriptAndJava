import { UserHeader } from "./UserHeader";

export function MesssageComponent({id, message, user, createdAt }: MessageDto) {
    const username = 'juan123';
    return (
        <div className={username == user.username ?'message_component ismainuser':'message_component'} id={`idm${id}`}>
            <UserHeader {...user} createdAt={createdAt} isNavigate={false}/>
            <p className="message">{message}</p>
        </div>
    );
}
