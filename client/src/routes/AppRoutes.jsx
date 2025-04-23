import { Route, Routes } from 'react-router';
import Home from "../pages/Home";
import Websocket from "../pages/websocket/Websocket";
import WebSocketChat from "../pages/websocket/chat/WebSocketChat";
import {Sse} from "../pages/sse/Sse";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sse" element={<Sse/>} />
                <Route path="/websocket" element={<Websocket/>}/>
                <Route path="/websocket/chat" element={<WebSocketChat />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
