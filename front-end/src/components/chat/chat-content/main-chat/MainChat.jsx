import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Button, Input, message } from 'antd';
import { ItemContent, ContentName, HeaderIcon, ContentAbout, IconItemInput } from '~/utils/Layout';
import {
    FileExclamationOutlined,
    LikeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PhoneOutlined,
    SmileOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { bodyChat, border, primaryColor } from '~/utils/color';
import TextArea from 'antd/lib/input/TextArea';
import MyChat from './my-chat/MyChat';
import FriendChat from './frient-chat/FriendChat';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { URL } from '~/utils/constant';
import { useSelector } from 'react-redux';


function MainChat({ option, setOption, selectedUser, userID }) {
    const [messages, setMessages] = useState([]);
    // Click change layout
    const [collapsed, setCollapsed] = useState(false);

    //use your link here
    var sock = new SockJS(`${URL}/ws`);
    let stompClient = Stomp.over(sock);
    const { user } = useSelector(state => state.user)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // Input
    useEffect(() => {
        const element = document.querySelector('#chat_input');
        element.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                document.querySelector('#send').click();
            }
        });
    }, []);

    const sendChat = () => {

        const input = document.getElementById('chat_input')
        var chatMessage = {
            conversationId: '6337c0eb80109d0a23f4980a',
            content: [input.value],
            type: 0,
            accessToken: user.accessToken
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    };

    useEffect(() => {
        sock.onopen = function () {
            console.log('open');
        }
        stompClient.connect({}, function (frame) {
            console.log('Connected - ha: ' + frame);
            stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
                console.log(chat);
                const mes = JSON.parse(chat.body)
                console.log(mes);
                console.log(messages);
                console.log([...messages, mes]);
                setMessages(pre => { return [...pre, mes] })
                //you can execute any function here
            });
        });
    }, [])

    console.log(messages);
    return (
        <Wrapper>
            <HeaderWrapper>
                <ItemContent>
                    <Avatar
                        size={48}
                        src="https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg"
                    />
                </ItemContent>
                <ContentHeaderChat>
                    <UserContent>
                        <ContentName>Minh Châu</ContentName>
                        <ContentAbout>Vừa truy cập</ContentAbout>
                    </UserContent>

                    <IconContent>
                        <HeaderIcon>
                            <UsergroupAddOutlined />
                        </HeaderIcon>
                        <HeaderIcon>
                            <PhoneOutlined />
                        </HeaderIcon>
                        <HeaderIcon>
                            <VideoCameraOutlined />
                        </HeaderIcon>
                        <HeaderIcon onClick={toggleCollapsed}>
                            {collapsed ? (
                                <MenuFoldOutlined onClick={() => setOption('action')} />
                            ) : (
                                <MenuUnfoldOutlined onClick={() => setOption('unaction')} />
                            )}
                        </HeaderIcon>
                    </IconContent>
                </ContentHeaderChat>
            </HeaderWrapper>
            {/* Body Chat */}
            <BodyChat>
                {
                    messages?.map(message =>
                        message.senderId === user.id ?
                            <MyChat message={message} /> : <FriendChat message={message} />
                    )
                }
            </BodyChat>
            <IconInput>
                <IconItemInput>
                    <SmileOutlined />
                </IconItemInput>
                <IconItemInput>
                    <FileExclamationOutlined />
                </IconItemInput>
            </IconInput>
            <FooterChat>
                <InputMessage>
                    <Input
                        id="chat_input"
                        placeholder="Nhập nội dung"
                    // autoSize
                    // value={value}
                    // onChange={(e) => setValue(e.target.value)}
                    // onBlur={(e) => setMessage(e.target.value)}
                    />
                </InputMessage>
                <IconMessage>
                    <IconItemInput>
                        <LikeOutlined />
                    </IconItemInput>
                    <Button id="send" onClick={sendChat} type="primary">
                        Gửi
                    </Button>
                </IconMessage>
            </FooterChat>
        </Wrapper>
    );
}

export default MainChat;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0 0 auto;
    /* width: calc(100% - 343px); */
    width: 100%;
    height: 100%;
    flex-flow: row wrap;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 68px;
    padding: 0 16px;
    border-bottom: 1px solid ${border};
`;
const ContentHeaderChat = styled.div`
    display: flex;
    width: calc(100% - 64px);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
const IconContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;
/* Body Chat */
const BodyChat = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 169px);
    background-color: ${bodyChat};
`;
/* Icon Chat */
const IconInput = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 46px;
    padding-left: 16px;
    border-top: 1px solid ${border};
`;

/* Footer Chat */
const FooterChat = styled.div`
    display: flex;
    padding: 0 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    width: 100%;
    border-top: 1px solid ${primaryColor};
`;
const InputMessage = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    textarea.ant-input {
        font-size: 15px;
        font-weight: 400;
        border: none;
        &:focus {
        }
    }
`;
const IconMessage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
