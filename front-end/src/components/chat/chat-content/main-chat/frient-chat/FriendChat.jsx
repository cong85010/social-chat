import { Avatar, Image } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { bgColor } from '~/utils/color';
import { URL } from '~/utils/constant';

function FriendChat({ avatar, message, status }) {
    const { user } = useSelector(state => state.user)


    const MessageTypFile = (id) => {
        // useEffect(() => {
        //     axios({
        //         method: "get",
        //         url: `${URL}/api/message/get-message-file/${message.content[0]}`,
        //         headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.accessToken}`, },
        //     }).then(res => console.log(res))
        // }, [id])

        console.log(message);
        if (!message?.content?.length) return <></>
        return <div>
            <Image src={message?.content[0]} alt="hinh anh" width={100} height={100} />
            <p> {message?.fileName}</p>
        </div>
    }

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
                        <MessageText>
                            {message.type === 1 ? <MessageTypFile id={message?.id} /> :
                                message.content[0]}
                        </MessageText>
                    </MessageItem>
                </MessageContent>
            </MessageContainer>
        </Wrapper>
    );
}

export default FriendChat;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    padding: 5px 16px 7px 16px;
    width: 100%;
`;

const ItemContent = styled.div`
    display: flex;
    width: 40px;
    height: 40px;
`;

const MessageContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
`;
const MessageContent = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
const MessageItem = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
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
    background: ${bgColor};
`;
