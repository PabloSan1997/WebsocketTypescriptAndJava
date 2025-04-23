import ReactDOM from "react-dom/client";
import { RoutesIndex } from "./routes/RoutesIndex";
import './styles/index.scss';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
    <RoutesIndex />
);