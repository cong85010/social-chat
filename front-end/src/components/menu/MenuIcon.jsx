import styled from 'styled-components';
import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import {
 MessageOutlined,
 ContactsOutlined,
 CheckSquareOutlined,
 AppstoreOutlined,
 ContainerOutlined,
 DesktopOutlined,
 MailOutlined,
 MenuFoldOutlined,
 MenuUnfoldOutlined,
 PieChartOutlined,
} from '@ant-design/icons';
import { primaryColor } from '~/utils/color';

function MenuBar() {
 function getItem(label, key, icon, children, type) {
  return {
   key,
   icon,
   children,
   label,
   type,
  };
 }
 const items = [
  getItem('Option 1', '1', <MessageOutlined />),
  getItem('Option 2', '2', <ContactsOutlined />),
  getItem('Option 3', '3', <CheckSquareOutlined />),
 ];

 return (
  <Wrapper>
   <HeaderMenu>
    <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" items={items} />
   </HeaderMenu>
  </Wrapper>
 );
}

export default MenuBar;

const Wrapper = styled.div`
 display: flex;
 justify-content: space-around;
 align-items: center;
 flex-direction: column;
 width: 100%;
 height: 100%;
`;
const HeaderMenu = styled.div`
 display: flex;
 justify-content: flex-start;
 align-items: center;
 flex-direction: column;
 width: 100%;
 height: 100%;
`;
