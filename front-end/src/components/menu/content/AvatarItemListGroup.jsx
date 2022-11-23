import styled from 'styled-components';
import React, { useState } from 'react';
import { Avatar, Button, Tooltip } from 'antd';
import { textAbout, itemHover, border, textTitle } from '../../../utils/color';
import { ItemContent, ContentName, ContentAbout } from '../../../utils/Layout';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

function AvatarItemNoHours({ name, content, avatar, curentUser }) {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <Wrapper>
            <ItemContent>
                <Avatar.Group
                    maxCount={2}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <Avatar size={40} src={avatar} />
                    <Avatar style={{ backgroundColor: '#f56a00' }} src={avatar}>K</Avatar>

                    <Tooltip title="Ant User" placement="top">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} src={avatar}/>
                    </Tooltip>
                    <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} src={avatar}/>
                </Avatar.Group>
            </ItemContent>
            <Content>
                <TitleContent>
                    <ContentAbout>{content}</ContentAbout>
                </TitleContent>
                <MoreContent>
                    <Button loading={isLoading} type='primary'>Vào nhóm</Button>
                </MoreContent>
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
    width: 55%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

const MoreContent = styled.div`
    width: 45%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${textTitle};
    flex-direction: row;
`;
