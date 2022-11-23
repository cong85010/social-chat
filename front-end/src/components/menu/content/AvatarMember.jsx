import { Avatar, Button } from "antd";
import React, { useState } from 'react';
import styled from 'styled-components';
import { AvatarDefault } from '~/utils/constant';
import { itemHover, textTitle } from '../../../utils/color';
import { ContentName, ItemContent } from '../../../utils/Layout';


function AvatarAddFriend({ name, content, avatar, userCurrentId, id, isAdmin, adminId, handleRemoveConversation, handleUpdateAdminGroup }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Wrapper>
            <ItemContent>
                <Avatar size={48} src={avatar || AvatarDefault} />
            </ItemContent>
            <Content>
                <TitleContent>
                    <ContentName>
                        <CustomName>
                            {name}{isAdmin && id === adminId && <HeadGroup>Trưởng nhóm</HeadGroup>}
                        </CustomName>
                    </ContentName>
                </TitleContent>
                {
                    isAdmin && id !== userCurrentId && <MoreContent>
                        <Button loading={isLoading} type='primary' onClick={() => handleUpdateAdminGroup(id)}>Thay TN</Button>
                    </MoreContent>
                }
                {
                    isAdmin && id !== userCurrentId && <MoreContent style={{ marginLeft: '10px' }}>
                        <Button loading={isLoading} type='default' onClick={() => handleRemoveConversation(id)}>Mời rời nhóm</Button>
                    </MoreContent>
                }
            </Content>
        </Wrapper>
    );
}

export default AvatarAddFriend;

const HeadGroup = styled.span`
    font-size: 12px;
    color: #3d96c9;
    line-height: 30px;
`

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

const CustomName = styled.div`
    display: flex;
    flex-direction: column
`

const Content = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
    `;
const TitleContent = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const MoreContent = styled.div`
    width: 45%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${textTitle};
    flex-direction: row;
`;
