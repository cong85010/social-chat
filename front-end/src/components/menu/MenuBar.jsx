import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import BackToUp from '@uiw/react-back-to-top';

import { border, primaryColor, bgborder, textTitle } from '~/utils/color';
import MenuIcon from './MenuIcon';
import AvatarImg from './content/AvatarImg';
import { HeaderIcon } from '../../utils/Layout';
import { Input, Space, Tabs } from 'antd';
import {
    MessageOutlined,
    ContactsOutlined,
    CheckSquareOutlined,
    CloudOutlined,
    OneToOneOutlined,
    SettingOutlined,
    AudioOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import AvatarItem from './content/AvatarItem';

const bottomItems = [
    {
        title: 'message',
        icon: <CloudOutlined />,
    },
    {
        title: 'message',
        icon: <OneToOneOutlined />,
    },
    {
        title: 'message',
        icon: <SettingOutlined />,
    },
];

function MenuBar() {
    const [friend, setFriend] = useState([]);
    const [option, setOption] = useState('chat');

    // MenuIcon
    const renderItems2 = () => bottomItems.map((bottomItem, index) => <MenuIcon>{bottomItem.icon}</MenuIcon>);

    //  Search
    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    const onSearch = (value) => console.log(value);

    // All User
    const users = [
        {
            _id: '1',
            name: 'Minh Châu',
            content: 'Hi Tuan!!',
            avatar: 'https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg',
        },

        {
            _id: '2',
            name: 'Duy Khang',
            content: 'Hi Chau!!',
            avatar: 'https://s120-ava-talk.zadn.vn/b/f/3/a/3/120/4ae7bbb88211e3fdd33873839ba6a1d8.jpg',
        },

        {
            _id: '2',
            name: 'Duy Khang',
            content: 'Hi Chau!!',
            avatar: 'https://s120-ava-talk.zadn.vn/b/f/3/a/3/120/4ae7bbb88211e3fdd33873839ba6a1d8.jpg',
        },
        {
            _id: '2',
            name: 'Duy Khang',
            content: 'Hi Chau!!',
            avatar: 'https://s120-ava-talk.zadn.vn/b/f/3/a/3/120/4ae7bbb88211e3fdd33873839ba6a1d8.jpg',
        },
        {
            _id: '1',
            name: 'Minh Châu',
            content: 'Hi Tuan!!',
            avatar: 'https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg',
        },

        {
            _id: '2',
            name: 'Lê Tuấn',
            content: 'Hi Chau!!',
            avatar: 'https://s120-ava-talk.zadn.vn/c/f/3/5/20/120/e83b009221d944ac707d41f4da3e138e.jpg',
        },
        {
            _id: '1',
            name: 'Minh Châu',
            content: 'Hi Tuan!!',
            avatar: 'https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg',
        },
    ];

    useEffect(() => {}, []);

    //  Tab Menu
    const tabMenu = () => {
        return (
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Tất cả" key="1">
                    {users.map((user, index) => (
                        <AvatarItem
                            key={index}
                            index={user._id}
                            name={user.name}
                            content={user.content}
                            avatar={user.avatar}
                        />
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chưa đọc" key="2">
                    Content of Tab Pane 2
                </Tabs.TabPane>
            </Tabs>
        );
    };
    return (
        <Wrapper>
            <StartWrapper>
                <AvatarImg />
                <TopMenuICon>
                    <MenuIcon>
                        <MessageOutlined onClick={() => setOption('chat')} />
                    </MenuIcon>
                    <MenuIcon>
                        <ContactsOutlined onClick={() => setOption('contact')} />
                    </MenuIcon>
                    <MenuIcon>
                        <CheckSquareOutlined onClick={() => setOption('check')} />
                    </MenuIcon>
                </TopMenuICon>
                <BottomMenuICon>{renderItems2()}</BottomMenuICon>
            </StartWrapper>
            <EndWrapper>
                <HeaderSearch>
                    <Space direction="horizontal">
                        <Search placeholder="Tìm Kiếm" allowClear onSearch={onSearch} />
                    </Space>
                    <HeaderIcon>
                        <UserAddOutlined />
                    </HeaderIcon>
                    <HeaderIcon>
                        <UsergroupAddOutlined />
                    </HeaderIcon>
                </HeaderSearch>
                {option === 'chat' ? <TabMenuItem>{tabMenu()}</TabMenuItem> : null}
            </EndWrapper>
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
    padding-top: 32px;
    background-color: ${primaryColor};
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 64px;
    height: 100%;
`;

const TopMenuICon = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
`;

const BottomMenuICon = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    width: 64px;
    height: 100%;
`;

const EndWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 64px);
    height: 100%;
`;
const HeaderSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    width: 100%;
    height: 64px;
    .ant-space-item {
        background-color: ${bgborder};
    }
`;
const TabMenuItem = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 64px);

    .ant-tabs-nav-list {
        margin-left: 5px;
        width: 100%;
    }
    .ant-tabs-content-holder {
        height: calc(100% - 62px);
        width: 100%;
    }
    .ant-tabs-content.ant-tabs-content-top {
        height: 100%;
        width: 100%;
    }
    .ant-tabs.ant-tabs-top {
        height: 100%;
        width: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        .ant-tabs-nav {
            width: 100%;
            flex: 1;
            height: 62px;
            margin-bottom: 0;
        }
        div#rc-tabs-1-panel-1 {
            overflow-y: scroll;
            flex: 1;
            height: 100%;
            position: relative;

            &::-webkit-scrollbar {
                position: relative;
                width: 6px;

                background-color: #ffff;
            }
            & ::-webkit-scrollbar-track {
                position: absolute;
            }
            &::-webkit-scrollbar-thumb {
                position: absolute;
                background-color: ${border};
            }
        }
    }
`;
// Search
const Search = styled.div`
    width: calc(100% - 64px);
`;

// TabMenu
