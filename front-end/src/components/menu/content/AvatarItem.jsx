import styled from 'styled-components';
import React, { useState } from 'react';
import { Avatar, Skeleton } from 'antd';
import { textAbout, itemHover, border, textTitle } from '../../../utils/color';
import { ItemContent, ContentName, ContentAbout } from '../../../utils/Layout';
import { useDispatch } from 'react-redux';
import { getChatByConversationID } from '~/redux/slices/ChatSlice';
import { saveUserChat } from '~/redux/slices/UserChatSlice';
import { ChatItem } from 'react-chat-elements';
import { AvatarDefault } from '~/utils/constant';
import moment from 'moment';

function AvatarItem({ name, listMember = [], avatar, type, userIdCurrent, id, lastMessage, isLoading, adminId }) {

    const dispatch = useDispatch()
    const getNameConversation = () => {
        if (listMember.length === 2)
            return listMember.find(m => m.id !== userIdCurrent)?.name;
        return name || "Chưa xác định"
    }

    const handleChangeChat = () => {
        dispatch(getChatByConversationID(id))
        dispatch(saveUserChat({
            userChat: {
                id,
                name: getNameConversation(),
                listMember,
                avatar,
                type,
                isAdmin: adminId === userIdCurrent,
                adminId,
            }
        }))
    }

    return < ChatItem
        avatar={avatar || AvatarDefault
        }
        alt={avatar}
        title={getNameConversation()}
        subtitle={lastMessage?.content[0]}
        date={new Date(lastMessage?.timeSend)}
        unread={0}
        onClick={handleChangeChat}
    />
}

export default AvatarItem;
const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
`;
const TitleContent = styled.div`
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

// Time-About
const MoreContent = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${textTitle};
    flex-direction: row;
`;
const AboutTime = styled.div`
    color: ${textTitle};
    padding-right: 5px;
`;

// Friend
