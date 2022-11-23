import { Avatar, Badge, Image } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { bgColor } from '~/utils/color';
import { URL } from '~/utils/constant';
import { AvatarDefault } from '~/utils/constant';
import { DeleteOutlined, HeartFilled, HeartOutlined, LikeFilled } from '@ant-design/icons';
import { FacebookSelector } from 'react-reactions/lib/components/facebook/FacebookSelector';
import { FacebookCounter, GithubCounter } from 'react-reactions';

function FriendChat({ avatar, message, status, handleReaction }) {
    const { user } = useSelector(state => state.user)
    const [hover, setHover] = useState(false);
    const [hoverEmoji, setHoverEmoji] = useState(false);
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

    const handleReactionChange = () => {
        handleReaction(message.id, 1)
    }


    // const ReactionIcon = ({ reacts }) => {
    //     console.log(reacts);
    //     const react = reacts[0]

    //     const getReact = ({ type, counter }) => {
    //         switch (type) {
    //             case 0: return <Badge count={counter}>
    //                 <LikeFilled style={{ color: 'blue' }} />
    //             </Badge>
    //             case 1: return <Badge count={counter}>
    //                 <HeartFilled style={{ color: 'red' }} />
    //             </Badge>
    //             case 2: return <Badge count={counter}>
    //                 <HahaF style={{ color: 'red' }} />
    //             </Badge>
    //             case 3: return <Badge count={counter}>
    //                 <HeartFilled style={{ color: 'red' }} />
    //             </Badge>
    //             default: return <></>
    //         }
    //     }
    //     const list = []
    //     reacts.map(cur => {
    //         list.push(getReact(cur))
    //     }, [])

    //     return list;
    // }

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
                    <MessageItem onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                        <MessageText >
                            {message?.type === 1 ? <MessageTypFile id={message?.id} /> :
                                message?.content[0]}
                        </MessageText>
                        <Reaction onClick={handleReactionChange}>
                            {
                                message?.reactList ? <Heart><HeartFilled className='icon' style={{ color: '#f23', marginRight: '2px', fontSize: 20 }} /><span className='center'>{message?.reactList.length}</span></Heart> :
                                    <HeartOutlined style={{ color: '#f23', marginRight: '10px', fontSize: 20 }} />
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

