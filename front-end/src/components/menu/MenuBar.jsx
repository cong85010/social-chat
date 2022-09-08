import styled from 'styled-components';
import React from 'react';
import { border, primaryColor } from '~/utils/color';

function MenuBar() {
 return (
  <Wrapper>
   <StartWrapper></StartWrapper>
   <EndWrapper></EndWrapper>
  </Wrapper>
 );
}

export default MenuBar;
const Wrapper = styled.nav`
 display: flex;
 justify-content: space-between;
 height: 100%;
 border-right: 1px solid ${border};
`;

const StartWrapper = styled.div`
 background-color: ${primaryColor};
 display: flex;
 justify-content: space-between;
 flex-direction: column;
 align-items: center;
 width: 64px;
 height: 100%;
`;

const EndWrapper = styled.div`
 display: flex;
 justify-content: space-between;
 flex-direction: column;
 align-items: center;
 width: calc(100% - 64px);
 height: 100%;
`;
