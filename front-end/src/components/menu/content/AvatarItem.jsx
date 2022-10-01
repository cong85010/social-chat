import styled from 'styled-components';
import React, { useState } from 'react';
import { Avatar } from 'antd';
import { textAbout, itemHover, border, textTitle } from '../../../utils/color';
import { ItemContent, ContentName, ContentAbout } from '../../../utils/Layout';

function AvatarItem({ name, listMember, avatar, type, userIdCurrent }) {

    const getNameConversation = () => {
        if (type) {
            return name;
        } else {
            return listMember.find(m => m.id !== userIdCurrent).name;
        }
    }

    return (
        <Wrapper>
            <ItemContent>
                <Avatar size={48} src={avatar} />
            </ItemContent>
            <Content>
                <TitleContent>
                    <ContentName>{getNameConversation()}</ContentName>
                    <ContentAbout>{ }</ContentAbout>
                </TitleContent>
                <MoreContent>
                    <AboutTime>1</AboutTime>
                    giờ
                </MoreContent>
            </Content>
        </Wrapper>
    );
}

export default AvatarItem;
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
