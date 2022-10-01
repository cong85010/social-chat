import styled from 'styled-components';
import React, { useState } from 'react';
import { Avatar } from 'antd';
import { textAbout, itemHover, border, textTitle } from '../../../utils/color';
import { ItemContent, ContentName, ContentAbout } from '../../../utils/Layout';

function AvatarItemNoHours({ name, content, avatar, curentUser }) {
    return (
        <Wrapper>
            <ItemContent>
                <Avatar size={48} src={avatar} />
            </ItemContent>
            <Content>
                <TitleContent>
                    <ContentName>{name}</ContentName>
                    <ContentAbout>{content}</ContentAbout>
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
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;