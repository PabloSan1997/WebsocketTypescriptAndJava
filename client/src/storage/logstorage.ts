

export const logstorage = {
    read(): string {
        if (!localStorage.ll) {
            localStorage.ll = '';
        }
        return localStorage.ll;
    },
    save(token: string) {
        localStorage.ll = token;
    }
}