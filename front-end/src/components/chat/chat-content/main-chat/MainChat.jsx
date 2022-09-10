import styled from 'styled-components';
import React from 'react';

function MainChat() {
 return <Wrapper>Mainchat</Wrapper>;
}

export default MainChat;

const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 flex: 0 0 auto;
 width: calc(100% - 343px);
 height: 100%;
 flex-flow: row wrap;
`;
