import styled from 'styled-components';
import React from 'react';
import { Avatar } from 'antd';
import { bgColor, border, myMessage } from '~/utils/color';
import { ContentAbout } from '~/utils/Layout';

function MyChat({ avatar, message, status }) {
    const messages = [
        {
            _id: 1,
            content: 'This is messages!',
            time: '12:15',
        },
        {
            _id: 1,
            content: 'This is messages from Chau!',
            time: '12:15',
        },
        {
            _id: 1,
            content: 'This is messages!',
            time: '12:15',
        },
        {
            _id: 1,
            content: 'This is messages!',
            time: '12:15',
        },
    ];
    return (
        <Wrapper>
            <ItemContent>
                {/* Avatar */}
                <Avatar
                    size={40}
                    src="https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg"
                />
            </ItemContent>
            {/* Mesage */}
            <MessageContainer>
                <MessageContent>
                    <MessageItem>
                        {messages.map((message, index) => (
                            <MessageText>
                                {message.content}
                                {/* <ContentAbout>{message.time}</ContentAbout> */}
                            </MessageText>
                        ))}
                    </MessageItem>
                </MessageContent>
            </MessageContainer>
        </Wrapper>
    );
}

export default MyChat;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: row-reverse;
    padding: 5px 16px 7px 16px;
    width: 100%;
    margin-bottom:20px;
`;

const ItemContent = styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
`;

const MessageContainer = styled.div`
    display: flex;

    flex-direction: column;
    width: 100%;
`;
const MessageContent = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column-reverse;
`;
const MessageItem = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-right: 10px;
`;
const MessageText = styled.div`
    min-width: 32px;
    max-width: calc(100% - 38px);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 12px;
    border-radius: 8px;
    font-size: 15px;
    margin-bottom: 4px;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    background: ${myMessage};
`;
