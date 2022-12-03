import styled from 'styled-components';
import React, { useState } from 'react';
import MenuBar from '../menu/MenuBar';
import MainChat from './chat-content/main-chat/MainChat';
import AboutChat from './chat-content/about-chat/AboutChat';

import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useDispatch, useSelector } from 'react-redux';
import { updateContentChat } from '~/redux/slices/ChatSlice';
import { URL } from '~/utils/constant';

function Chat() {
    const [isShowAbout, setIsShowAbout] = useState(false);
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState(false);

    //use your link here
    const sock = new SockJS(`${URL}/ws`);
    const stompClient = Stomp.over(sock);

    useEffect(() => {
        if (!isConnected) {
            sock.onopen = function () {
                console.log('open');
            }
            stompClient.connect({}, function (frame) {
                stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
                    const message = JSON.parse(chat.body)
                    dispatch(updateContentChat(message))
                });
                setIsConnected(true)
            });
        }


    }, [dispatch, isConnected, sock, stompClient, user.id])

    return (
        <Wrapper>
            <MenuInner>
                <MenuBar />
            </MenuInner>
            <SlideNav>
                <MainChat {...{ isShowAbout, setIsShowAbout, stompClient }} />
                {isShowAbout && <AboutChat />}
            </SlideNav>
        </Wrapper>
    );
}

export default Chat;

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    min-width: 100%;
    height: 100vh;
    flex-flow: row wrap;
    position: absolute;
`;

const MenuInner = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 408px;
`;

const SlideNav = styled.nav`
    box-sizing: border-box;
    height: 100%;
    width: calc(100% - 408px);
    display: flex;
    flex-direction: row;
    @media (max-width: 640px) {
        display: none;
    }

    @media (min-width: 800px) {
    }
`;
