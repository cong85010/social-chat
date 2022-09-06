import { Layout } from 'antd';
import React from 'react';
const { Header, Footer, Sider, Content } = Layout;

function Menu() {
    return (
        <div style={{ height: "100%",height:" 100vh " }}>
         <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
      </div>)
}

export default Menu;