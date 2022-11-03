import { EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Popover } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { myMessage } from '~/utils/color';
import { AvatarDefault } from '~/utils/constant';

function MyChat({ avatar, message, status }) {
    const { user } = useSelector(state => state.user)

    const MessageTypFile = () => {

        return <div>
            {message.fileName}<br />
            <Image src={message.url} alt="hinh anh" width={100} height={100} />
        </div>
    }

    const MENU = () => {
        return <div>
            <Button size='small'>Thu hồi</Button>
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
                            <WrapperIcon className="chat-more">
                                <Popover placement="left" content={MENU} trigger="click">
                                    <EllipsisOutlined />
                                </Popover>
                            </WrapperIcon>
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

    &:hover .chat-more {
        visibility: visible;
    }
`;

const WrapperIcon = styled.div`
    visibility: hidden;
    position: absolute;
    left: -25px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #f3f3f3b9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    width: 20px;
    cursor: pointer;
`
const MessageText = styled.div`
    position: relative;
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
