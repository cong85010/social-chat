import styled from 'styled-components';
import React, { useState } from 'react';
import { Avatar, message } from 'antd';
import { textAbout, itemHover, border, textTitle } from '../../../utils/color';
import { ItemContent, ContentName, ContentAbout } from '../../../utils/Layout';
import { AvatarDefault, URL } from '~/utils/constant';
import { UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getToken } from '~/utils/function';

function AvatarItemNoHours({ name, content, avatar, curentUser, id }) {

    const handleAddFriend = async () => {
        const data = await axios.post(`${URL}/api/friend-request/send-to-user/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                Accept: 'application/json',
            },
        }).catch(err => message.error(err?.response?.data?.messageError))
        if (data.code === 200)
            message.success("Gửi lời mời thành công")
    }
    return (
        <Wrapper>
            <ItemContent>
                <Avatar size={48} src={avatar || AvatarDefault} />
            </ItemContent>
            <Content>
                <TitleContent>
                    <ContentName>{name}</ContentName>
                    <ContentAbout style={{ justifyContent: 'flex-end' }}><UserAddOutlined style={{ fontSize: 30 }} onClick={handleAddFriend} /> </ContentAbout>
                </TitleContent>
            </Content>
        </Wrapper>
    );
}

export default AvatarItemNoHours;
const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0 16px;
    height: 72px;
    &:hover {
        cursor: pointer;
        transition: 0.5s ease;
        background-color: ${itemHover};
    }
`;

const Content = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
    `;
const TitleContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;