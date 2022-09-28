import styled from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Button, Input } from 'antd';
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

function MainChat({ option, setOption, selectedUser, userID }) {
    const [chat, setChat] = useState([]);
    // Click change layout
    const [collapsed, setCollapsed] = useState(false);
    const [value, setValue] = useState('');

    const text_input = useRef();
    const chat_body = useRef();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // Change With MainChatfull
    useEffect(() => { }, []);

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
        const message = document.getElementById('chat_input').value;
        document.getElementById('chat_input').value = '';
        setChat((prev) => []);
        if (userID) {
        } else {
        }
    };
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
                <FriendChat />
                <MyChat />
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
                    <StyledTextArea
                        id="chat_input"
                        placeholder="Nhập nội dung"
                        autoSize
                        value={value}
                        onChange={(e) => setValue(e.target.value)}

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
    overflow-y: scroll;
    &::-webkit-scrollbar {
        position: relative;
        width: 6px;
        background-color: #ffff;
    }
    &::-webkit-scrollbar-track {
        position: absolute;
    }
    &::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: ${border};
    }
`;
const StyledTextArea = styled(TextArea)`
    &.ant-input:focus{
       box-shadow: none;
    }
`
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
    width: 91%;
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
