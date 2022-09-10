import styled from 'styled-components';
import React from 'react';
import AvatarImg from './content/AvatarImg';

function MenuBar() {
 return <AvatarImg />;
}

export default MenuBar;

const Wrapper = styled.nav`
 display: flex;
 justify-items: center;
 justify-content: space-between;
 height: 100%;
`;
