import ReactDOM from "react-dom/client";
import { RoutesIndex } from "./routes/RoutesIndex";
import './styles/index.scss';
import { ContextProvider } from "./ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.querySelector('#root')!);

const client = new QueryClient();

root.render(
    <QueryClientProvider client={client}>
        <ContextProvider>
            <RoutesIndex />
        </ContextProvider>
    </QueryClientProvider>
);