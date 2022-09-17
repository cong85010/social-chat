import styled from 'styled-components';
import React from 'react';
import { Avatar } from 'antd';

function AvatarImg() {
    return (
        <Wrapper>
            <Avatar size={48} src="https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg" />
        </Wrapper>
    );
}

export default AvatarImg;
const Wrapper = styled.nav`
    width: 100%;
    height: 64px;
    margin-bottom: 16px;
    &:hover {
        cursor: pointer;
    }
`;
