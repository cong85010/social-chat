import { Avatar, Badge, Image, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { bgColor } from '~/utils/color';
import { URL } from '~/utils/constant';
import { AvatarDefault } from '~/utils/constant';
import { DeleteOutlined, DownloadOutlined, HeartFilled, HeartOutlined, LikeFilled, EyeOutlined } from '@ant-design/icons';
import { FacebookSelector } from 'react-reactions/lib/components/facebook/FacebookSelector';
import { FacebookCounter, GithubCounter } from 'react-reactions';

function FriendChat({ avatar, message, status, handleReaction, getNameBySeederId }) {
    const { user } = useSelector(state => state.user)
    const [hover, setHover] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    if (!message) {
        return <></>
    }

    const handleReactionChange = async () => {
        try {
            setIsLoading(true)
            await handleReaction(message.id, 1)
            setTimeout(() => {
                setIsLoading(false)
            }, 300)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const getFileName = message?.content[0]?.slice(67);
    const MessageTypeIMG = () => {
        if (message?.content[0] == 'Tin nhắn đã được thu hồi') {
            return 'Tin nhắn đã được thu hồi'
        }

        return <div>
            {getFileName}<br />
            <Image src={message?.url || message?.content[0]} alt="hinh anh" width={100} height={100} />
        </div>
    }

    const MessageTypeFile = () => {

        if (message.content[0] == 'Tin nhắn đã được thu hồi') {
            return 'Tin nhắn đã được thu hồi'
        }


        return <div>Tên: {getFileName}<br />
            <img alt="hinhaanh" src="https://play-lh.googleusercontent.com/58sr3IvX1wiE8ei_BICqPgywKgZ5DPpmRL_2YuZINnFlz_9D2os9PmueeZPPtZno0zk" width={50} />
            <a onClick={() => window.open(message.content && message.content[0])} href={message.url} target="_blank" rel="noreferrer"><EyeOutlined style={{ fontSize: 25, marginLeft: 30 }} /></a>
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
                <span>{getNameBySeederId(message?.senderId)}</span>
                <MessageContent>
                    <MessageItem onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                        <MessageText >
                            {message.type === 1 ? <MessageTypeIMG /> :
                                message.type === 2 ? <MessageTypeFile /> :
                                    message.content[0]}
                        </MessageText>
                        <Reaction onClick={handleReactionChange}>
                            {isLoading ? <Spin /> :
                                ('Tin nhắn đã được thu hồi' !== message?.content[0]) &&
                                (message?.reactList ? <Heart><HeartFilled className='icon' style={{ color: '#f23', marginRight: '2px', fontSize: 20 }} /><span className='center'>{message?.reactList.length}</span></Heart> :
                                    <HeartOutlined style={{ color: '#f23', marginRight: '10px', fontSize: 20 }} />)
                            }
                        </Reaction>
                    </MessageItem>
                </MessageContent>
            </MessageContainer>

        </Wrapper>
    );
}

export default FriendChat;

const Heart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    background: #c9c9c9;
    border-radius: 10px;
    padding: 2px 4px;
    border: 1px solid #321;
`

const Reaction = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 0 10px;
    > div {

    }
    :hover {
        cursor: pointer;
    }
`

const Wrapper = styled.div`
    display: flex;
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
    align-items: flex-end;
    flex-direction: row;
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
    position: relative;
    &:hover{
        transform: translateY(-2px);
    }
    &::before{
        content: "";
        position: absolute;
        display: block;
        /* background-color: red; */
        width: 350px;
        height: 80px;
        /* left: 555px; */
        top: -44px;
    }
`

