import { Route, Routes } from 'react-router';
import Home from "../pages/Home";
import Websocket from "../pages/websocket/Websocket";
import WebSocketChat from "../pages/websocket/chat/WebSocketChat";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/websocket" element={<Websocket/>}/>
                <Route path="/websocket/chat" element={<WebSocketChat />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
