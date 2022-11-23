import './App.css';
import 'antd/dist/antd.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '~/components/login/Login';
import Chat from '~/components/chat/Chat';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const { isSuccess } = useSelector((state) => state.user);
    if (isSuccess) return children;

    return <Navigate to="/login" />;
};

function App() {
    message.config({
        top: 50,
        duration: 2,
        maxCount: 3,
    });
    return (
        <div className="App">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <PrivateRoute>
                            <Chat />
                        </PrivateRoute>
                    }
                />

                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;