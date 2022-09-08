import styled from 'styled-components';
import React from 'react';
import MenuBar from '../menu/MenuBar';

function Chat() {
 return (
  <Wrapper>
   <MenuInner>
    <MenuBar />
   </MenuInner>
   <SlideNav>right</SlideNav>
  </Wrapper>
 );
}

export default Chat;

const Wrapper = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
 flex: 0 0 auto;
 min-width: 100%;
 height: 100vh;
 flex-flow: row wrap;
`;

const MenuInner = styled.div`
 box-sizing: border-box;
 height: 100%;
 width: 408px;
`;

const SlideNav = styled.nav`
 box-sizing: border-box;
 height: 100%;
 width: calc(100% - 408px);
 @media (min-width: 640px) {
  display: none;
 }

 @media (min-width: 800px) {
 }
`;
