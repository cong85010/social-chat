import styled from 'styled-components';
import React, { useState } from 'react';
import MenuBar from '../menu/MenuBar';
import MainChat from './chat-content/main-chat/MainChat';
import AboutChat from './chat-content/about-chat/AboutChat';
import { useEffect } from 'react';

function Chat() {
    const [isShowAbout, setIsShowAbout] = useState(false);
    return (
        <Wrapper>
            <MenuInner>
                <MenuBar />
            </MenuInner>
            <SlideNav>
                <MainChat {...{ isShowAbout, setIsShowAbout }} />
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
