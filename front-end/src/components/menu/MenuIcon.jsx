import styled from 'styled-components';
import React from 'react';

function MenuBar() {
 return (
  <Wrapper>
   <AvatarImg />
  </Wrapper>
 );
}

export default MenuBar;

const Wrapper = styled.nav`
 display: flex;
 justify-content: space-between;
 height: 100%;
`;
