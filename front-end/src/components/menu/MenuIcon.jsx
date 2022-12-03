import styled from 'styled-components';
import React, { useState } from 'react';
import { Button } from 'antd';
import { primaryColor } from '~/utils/color';


function MenuIcon({ children, onClick }) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Wrapper onClick={onClick}>
            <Button loading={isLoading} type="primary">{children}</Button>
        </Wrapper>
    );
}

export default MenuIcon;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 64px;
    height: 64px;

 button.ant-btn.ant-btn-primary {
  border: none;
    
  width: 64px;
  height: 64px;

  svg {
   width: 24px;
   height: 24px;
  }
 }
`;
