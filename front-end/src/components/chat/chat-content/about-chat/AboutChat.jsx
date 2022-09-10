import styled from 'styled-components';
import React from 'react';
import { border } from '~/utils/color';

function AboutChat() {
 return <Wrapper>About</Wrapper>;
}

export default AboutChat;

const Wrapper = styled.nav`
 display: flex;
 justify-content: center;
 flex-direction: column;
 flex: 0 0 auto;
 width: 343px;
 height: 100%;
 flex-flow: row wrap;
 border-left: 1px solid ${border};
`;
