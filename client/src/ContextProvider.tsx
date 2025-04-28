/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { logstorage } from "./storage/logstorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { readApi } from "./api/readApi";

const initalUserinfo:UserHeader = {
    username: "",
    nickname: "",
    urlImage: ""
}

const LogContext = React.createContext<ContextInter>({
    token: "",
    login: function (_data: LoginDto): void {
        throw new Error("Function not implemented.");
    },
    register: function (_data: RegisterDto): void {
        throw new Error("Function not implemented.");
    },
    logout: function (): void {
        throw new Error("Function not implemented.");
    },
    userinfo: initalUserinfo
});


export function ContextProvider({ children }: Children) {

    const [token, setToken] = React.useState(logstorage.read());

    const { data: userinfodata } = useQuery({
        queryKey: ['key', token],
        queryFn: () => readApi.viewUserHeader(token),
        enabled: !!token.trim()
    });

    const {mutate:loginMutate} = useMutation({
        mutationFn:readApi.login,
        onSuccess:(res)=>{
            setToken(res.jwt);
            logstorage.save(res.jwt);
        }
    });

    const {mutate:registerMutate} = useMutation({
        mutationFn:readApi.register,
        onSuccess:(res)=>{
            setToken(res.jwt);
            logstorage.save(res.jwt);
        }
    });


    return (
        <LogContext.Provider value={{
            userinfo: userinfodata ?? initalUserinfo,
            token,
            login(data) {
                loginMutate(data);
            },
            register(data) {
                registerMutate(data);
            },
            logout() {
                setToken('');
                logstorage.save('');
            }
        }}>
            {children}
        </LogContext.Provider>
    );
}

export const UseContext = () => React.useContext(LogContext);
