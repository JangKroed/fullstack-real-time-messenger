import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SingnUp from './Login/SignUp';

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SingnUp />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default Views;
