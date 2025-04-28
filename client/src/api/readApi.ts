

export const urlbase = {
    rest: import.meta.env.DEV?'http://localhost:3004/api':`${window.location.origin}/api`,
    socket: import.meta.env.DEV?'ws://localhost:3004':window.location.origin
}

export const readApi = {
    async login(data: LoginDto): Promise<TokenResponse> {
        const ft = await fetch(`${urlbase.rest}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!ft.ok) {
            const { message } = await ft.json() as { message: string | undefined | null };
            if (message?.trim())
                throw { message }
            throw { message: 'Error con la conexion' }
        }
        return ft.json();
    },
    async register(data: RegisterDto): Promise<TokenResponse> {
        const ft = await fetch(`${urlbase.rest}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!ft.ok) {
            const { message } = await ft.json() as { message: string | undefined | null };
            if (message?.trim())
                throw { message }
            throw { message: 'Error con la conexion' }
        }
        return ft.json();
    },
    async viewUserHeader(token: string): Promise<UserHeader> {
        const ft = await fetch(`${urlbase.rest}/user/viewheader`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!ft.ok) {
            const { message } = await ft.json() as { message: string | undefined | null };
            if (message?.trim())
                throw { message }
            throw { message: 'Error con la conexion' }
        }
        return ft.json();
    },
    async findFriends(token: string, page: number): Promise<UserHeader[]> {
        const ft = await fetch(`${urlbase.rest}/user/findfriendheader?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!ft.ok) {
            const { message } = await ft.json() as { message: string | undefined | null };
            if (message?.trim())
                throw { message }
            throw { message: 'Error con la conexion' }
        }
        return ft.json();
    },
    async findMessage(token: string, userfriend: string):Promise<MessageDto[]> {
        const ft = await fetch(`${urlbase.rest}/message?userfriend=${userfriend}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!ft.ok) {
            const { message } = await ft.json() as { message: string | undefined | null };
            if (message?.trim())
                throw { message }
            throw { message: 'Error con la conexion' }
        }
        return ft.json();
    },
    async deleteMessage(token: string, id: number): Promise<void> {
        const ft = await fetch(`${urlbase.rest}/message/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!ft.ok) {
            const { message } = await ft.json() as { message: string | undefined | null };
            if (message?.trim())
                throw { message }
            throw { message: 'Error con la conexion' }
        }
    }
}