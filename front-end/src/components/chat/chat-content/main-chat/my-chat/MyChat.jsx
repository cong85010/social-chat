import { DownloadOutlined, EllipsisOutlined, EyeOutlined, FileOutlined, HeartFilled } from '@ant-design/icons';
import { Avatar, Button, Image, Popconfirm, Popover } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { myMessage } from '~/utils/color';
import axios from 'axios';
import { AvatarDefault, URL } from '~/utils/constant';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FacebookSelector } from 'react-reactions';


function MyChat({ message, revertChat }) {
    const { user } = useSelector(state => state.user)
    const [hover, setHover] = useState(false);
    const [hoverEmoji, setHoverEmoji] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!message) {
        return <></>
    }

    const getFileName = message.content && message.content[0]?.slice(67);

    const MessageTypeIMG = () => {
        if (message.content && message.content[0] == 'Tin nhắn đã được thu hồi') {
            return 'Tin nhắn đã được thu hồi'
        }

        return <div>
            {getFileName}<br />
            <Image src={message.url || message.content[0]} alt="hinh anh" width={100} height={100} />
        </div>
    }

    const MessageTypeFile = () => {

        if (message?.content && message.content[0] == 'Tin nhắn đã được thu hồi') {
            return 'Tin nhắn đã được thu hồi'
        }

        return <div>Tên: {getFileName}<br />
            <img alt="hinhaanh" src="https://play-lh.googleusercontent.com/58sr3IvX1wiE8ei_BICqPgywKgZ5DPpmRL_2YuZINnFlz_9D2os9PmueeZPPtZno0zk" width={50} />
            <a href={message?.content && message.content[0]} target="_blank" rel="noreferrer"><EyeOutlined style={{ fontSize: 25, marginLeft: 30 }} /></a>
        </div>
    }

    const MENU = () => {
        return <div>
            <Button loading={isLoading} size='small'>Thu hồi</Button>
        </div>
    }
    return (
        <Wrapper>
            <ItemContent>
                {/* Avatar */}
                <Avatar
                    size={40}
                    src={user?.avatar || AvatarDefault}
                />
            </ItemContent>
            {/* Mesage */}
            <MessageContainer>
                <MessageContent>
                    <MessageItem onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                        <MessageText >
                            {message.type === 1 ? <MessageTypeIMG /> :
                                message.type === 2 ? <MessageTypeFile /> :
                                    message.content[0]}
                        </MessageText>
                        <Reaction>
                            {
                                message?.reactList?.length > 0 ? <Heart><HeartFilled className='icon' style={{ color: '#f23', marginRight: '2px', fontSize: 15 }} /><span className='center'>{message?.reactList.length}</span></Heart> :
                                    <></>
                            }
                        </Reaction>
                        <div className='react-icon' style={{ display: 'flex' }}>
                            {hover && message.content && message.content[0] !== 'Tin nhắn đã được thu hồi' && <Popconfirm
                                placement="topRight"
                                title={"Xác nhận thu hồi tin nhắn"}
                                onConfirm={() => revertChat(message.id)}
                                okText="Xác nhận"
                                cancelText="Huỷ"
                            ><StyledDeleteOutlined />
                            </Popconfirm>}

                        </div>
                    </MessageItem>

                </MessageContent>
            </MessageContainer>
        </Wrapper >
    );
}

export default MyChat;

const Reaction = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 0 10px;
    > div {

    }
`

const Heart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    background: #c9c9c9;
    border-radius: 10px;
    padding: 2px 4px;
    border: 1px solid #807e7c;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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
    justify-content: flex-end;
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
    flex-direction: row-reverse;
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
    border-radius: 8px;
    font-size: 15px;
    padding: 12px;
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    background: ${myMessage};

`;
const StyledDeleteOutlined = styled(DeleteOutlined)`
    margin-top: 2px;
    background-color: #fff;
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
    z-index: 1;
    margin-left: 6px;
    margin-right: 6px;
    &:hover{
        transform: translateY(-2px);
    }
`
const StyledHeartOutlined = styled(HeartOutlined)`
    background-color: #fff;
    margin-top: 2px;
    border-radius: 50%;
    padding: 3px;
    color: red;
    cursor: pointer;
    z-index: 1;
    &:hover{
        transform: translateY(-2px);
    }
    &::before{
        content: "";
        position: absolute;
        display: block;
        width: 350px;
        height: 80px;
        right: 10px;
        top: -30px;
    }
`