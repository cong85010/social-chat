import './App.css';
import 'antd/dist/antd.min.css';
import { Routes, Route } from 'react-router-dom';
import Login from '~/components/login/Login';
import Chat from '~/components/chat/Chat';
import { message } from 'antd';

function App() {
    message.config({
        right: 100,
        duration: 2,
        maxCount: 3,
    });
    return (
        <div className="App">
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="messenger" element={<Chat />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
