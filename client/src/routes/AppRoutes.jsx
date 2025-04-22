import { Route, Routes } from 'react-router';
import Chat from "../pages/Chat";
import Home from "../pages/Home";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
