import styled from 'styled-components';
import React from 'react';
import { Avatar, Image } from 'antd';
import { bgColor, border, myMessage } from '~/utils/color';
import { ContentAbout } from '~/utils/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AvatarDefault, URL } from '~/utils/constant';

function MyChat({ avatar, message, status }) {
    const { user } = useSelector(state => state.user)

    const MessageTypFile = () => {

        return <div>
            {message.fileName}
            <Image src={message.url} alt="hinh anh" width={100} height={100} />
        </div>
    }
    return (
        <Wrapper>
            <ItemContent>
                {/* Avatar */}
                <Avatar
                    size={40}
                    src={avatar || AvatarDefault}
                />
            </ItemContent>
            {/* Mesage */}
            <MessageContainer>
                <MessageContent>
                    <MessageItem>
                        <MessageText>
                            {message.type === 1 ? <MessageTypFile /> :
                                message.content[0]}
                        </MessageText>
                    </MessageItem>
                </MessageContent>
            </MessageContainer>
        </Wrapper>
    );
}

export default MyChat;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: row-reverse;
    padding: 5px 16px 7px 16px;
    width: 100%;
    margin-bottom:0px;
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
