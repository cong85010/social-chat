import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import BackToUp from '@uiw/react-back-to-top';
import { border, primaryColor, bgborder, textTitle } from '~/utils/color';
import MenuIcon from './MenuIcon';
import AvatarImg from './content/AvatarImg';
import { HeaderIcon } from '../../utils/Layout';
import { Button, Form, Input, Modal, Space, Tabs } from 'antd';
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
    VideoCameraOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import AvatarItem from './content/AvatarItem';
import AvatarItemNoHours from './content/AvatarItemNoHours';
import AvatarItemListAddFriend from './content/AvatarItemListAddFriend';
import AvatarItemListGroup from './content/AvatarItemListGroup';
import { logout } from '~/redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { Router, useNavigate, useRoutes } from 'react-router-dom';

function MenuBar() {
    const [friend, setFriend] = useState(false);
    const [listAdd, setListAdd] = useState(false);
    const [listGroup, setListGroup] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const [option, setOption] = useState('chat');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const onFinish = () => {
        console.log('Success:');
    };

    const onFinishFailed = () => {
        console.log('Failed:');
    };

    const handleShowModalAddFriend = () => {
        setFriend(true)
    }
    const handleShowModalOKAddFriend = () => {
        setFriend(false)
    }
    const handleShowModalCancelAddFriend = () => {
        setFriend(false)
    }

    const handleShowModalListAdd= () => {
        setListAdd(true)
    }
    const handleShowModalOKListAdd= () => {
        setListAdd(false)
    }
    const handleShowModalCancelListAdd= () => {
        setListAdd(false)
    }

    const handleShowModalListGroup= () => {
        setListGroup(true)
    }
    const handleShowModalOKListGroup= () => {
        setListGroup(false)
    }
    const handleShowModalCancelListGroup= () => {
        setListGroup(false)
    }

    const handleShowModalLogOut = () => {
        setLogOut(true)
    }
    const handleShowModalOKLogOut = () => {
        setLogOut(false)
    }
    const handleShowModalCancelLogOut = () => {
        setLogOut(false)
    }

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
            _id: '4',
            name: 'Cloud của tôi',
            content: 'Hi Chau!!',
            avatar: 'https://res-zalo.zadn.vn/upload/media/2021/6/4/2_1622800570007_369788.jpg',
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

    const usersFind = [
        {
            _id: '3',
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

        {
            _id: '2',
            name: 'Duy Khang',
            content: 'Hi Chau!!',
            avatar: 'https://s120-ava-talk.zadn.vn/b/f/3/a/3/120/4ae7bbb88211e3fdd33873839ba6a1d8.jpg',
        },
    ];

    useEffect(() => { }, []);

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
            </Tabs>
        );
    };

    const tabContact = () => {
        return (
            <StyledFriendGroup>
                <StyledGroup style={{ height: '32px', lineHeight: '32px', cursor: 'pointer' }} onClick={handleShowModalAddFriend}>
                    <HeaderIcon>
                        <UserAddOutlined />
                    </HeaderIcon>
                    <h3>Thêm bạn bè bằng số điện thoại</h3>
                </StyledGroup>
                <StyledGroup onClick={handleShowModalListAdd}>
                    <StyledList>
                        <StyleImg src='https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png'></StyleImg>
                        <StyledText>Danh sách kết bạn</StyledText>
                    </StyledList>
                </StyledGroup>
                <StyledGroup onClick={handleShowModalListGroup}>
                    <StyledList>
                        <StyleImg src='https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png'></StyleImg>
                        <StyledText>Danh sách nhóm</StyledText>
                    </StyledList>
                </StyledGroup>
                <StyledGroup style={{ height: '48px', lineHeight: '48px', paddingLeft: '10px', borderTop: '1px solid #e5e7eb' }}>
                    <h3>Gửi File giữa di động và máy tính</h3>
                </StyledGroup>
                <StyledGroup>
                    <StyledList>
                        <StyleImg src='https://res-zalo.zadn.vn/upload/media/2021/6/4/2_1622800570007_369788.jpg' style={{ borderRadius: '50%' }}></StyleImg>
                        <StyledText>Cloud của tôi</StyledText>
                    </StyledList>
                </StyledGroup>
                <StyledGroup style={{ height: '60px', lineHeight: '60px', paddingLeft: '10px', borderTop: '1px solid #e5e7eb', flexDirection: 'column' }}>
                    <h3>Danh sách bạn bè</h3>
                    {users.map((user, index) => (
                        <AvatarItemNoHours key={index}
                            index={user._id}
                            name={user.name}
                            avatar={user.avatar}
                        />
                    ))}
                </StyledGroup>
                
            </StyledFriendGroup>
        );
        
    };

    const bottomItems = [
        {
            title: 'message',
            icon: <CloudOutlined />,
        },
        // {
        //     title: 'message',
        //     icon: <OneToOneOutlined />,
        // },
        {
            title: 'message',
            icon: <LogoutOutlined onClick={handleShowModalLogOut} />,
        },
    ];
    // MenuIcon
    const renderItems2 = () => bottomItems.map((bottomItem, index) => <MenuIcon>{bottomItem.icon}</MenuIcon>);


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
                    {/* <MenuIcon>
                        <CheckSquareOutlined onClick={() => setOption('check')} />
                    </MenuIcon> */}
                    {/* <MenuIcon>
                        <LogoutOutlined onClick={handleLogout} />
                    </MenuIcon> */}
                </TopMenuICon>
                <BottomMenuICon>{renderItems2()}</BottomMenuICon>
            </StartWrapper>
            <EndWrapper>
                <HeaderSearch>
                    <Space direction="horizontal">
                        <Search placeholder="Tìm Kiếm" allowClear onSearch={onSearch} />
                    </Space>
                    <HeaderIcon >
                        <UserAddOutlined onClick={handleShowModalAddFriend}/>
                    </HeaderIcon>
                    <HeaderIcon>
                        <UsergroupAddOutlined />
                    </HeaderIcon>
                </HeaderSearch>
                {option === 'chat' ? <TabMenuItem>{tabMenu()}</TabMenuItem> : null}
                {option === 'contact' ? <TabMenuItem>{tabContact()}</TabMenuItem> : null}

            </EndWrapper>
            {/* Modal Add friend */}
            <StyledModal title="Đặt tên gợi nhớ" open={friend} onCancel={handleShowModalCancelAddFriend} onOk={handleShowModalOKAddFriend}
                footer={[
                    <Button key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelAddFriend}>Hủy</Button>,
                    <Button key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleShowModalOKAddFriend}>Tìm kiếm</Button>
                ]}>
                <StyledForm
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item style={{marginBottom:'8px'}}>
                        <Input placeholder='Nhập số điện thoại cần tìm' />
                    </Form.Item>
                </StyledForm>
                <StyledResultAddFriend>
                    <StyledText>Kết quả tìm kiếm</StyledText>
                    {usersFind.map((user, index) => (
                        <AvatarItemNoHours
                            key={index}
                            index = {user._id}
                            name = {user.name}
                            avatar = {user.avatar}
                        ></AvatarItemNoHours>
                    ))}
                </StyledResultAddFriend>
            </StyledModal>

            {/* Modal show dsach loi moi ket ban */}
            <StyledModal title="Danh sách kết bạn" open={listAdd} onCancel={handleShowModalCancelListAdd} onOk={handleShowModalOKListAdd}
                footer={[
                    <Button key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelListAdd}>Hủy</Button>,
                    <Button key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleShowModalOKListAdd}>Đồng ý</Button>
                ]}>
                
                <StyledResultAddFriend>
                    {usersFind.map((user, index) => (
                        <AvatarItemListAddFriend
                            key={index}
                            index = {user._id}
                            name = {user.name}
                            avatar = {user.avatar}
                        ></AvatarItemListAddFriend>
                    ))}
                </StyledResultAddFriend>
            </StyledModal>

            <StyledModal title="Danh sách nhóm" open={listGroup} onCancel={handleShowModalCancelListGroup} onOk={handleShowModalOKListGroup}
                footer={[
                    <Button key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelListGroup}>Hủy</Button>,
                    <Button key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleShowModalOKListGroup}>Đồng ý</Button>
                ]}>
                
                <StyledResultAddFriend>
                    {usersFind.map((user, index) => (
                        <AvatarItemListGroup
                            key={index}
                            index = {user._id}
                            name = {user.name}
                            avatar = {user.avatar}
                        ></AvatarItemListGroup>
                    ))}
                </StyledResultAddFriend>
            </StyledModal>

            <StyledModal title="Xác nhận" open={logOut} onCancel={handleShowModalCancelLogOut} onOk={handleShowModalOKLogOut}
                footer={[
                    <Button key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelLogOut}>Hủy</Button>,
                    <Button key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleShowModalOKLogOut}>Đồng ý</Button>
                ]}>
                
                <StyledText>Bạn có muốn thoát ứng dụng không ?</StyledText>
            </StyledModal>
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
    overflow-y: scroll;
    &::-webkit-scrollbar{
        position: relative;
        width: 6px;
        background-color: #fff;
    }
    &::-webkit-scrollbar-track {
        position: absolute;
    }
    &::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: ${border};
    }

    .ant-tabs-tab{
        margin-left: 20px;
    }

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
        div#rc-tabs-1-panel-2 {
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

// StyledFriendGroup

const StyledFriendGroup = styled.div`
    display: flex;
    height: 72px;
    line-height: 72px;
    width: 100%;
    flex-direction: column;
`;

const StyledList = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    &.MenuBar__StyledList-sc-1cng64t-9:hover{
        cursor: pointer;
        transition: 0.5s ease;
        background-color: #eeeff2;
    }
`;

const StyledGroup = styled.div`
    display: flex;
    h3{
        margin: 0;
        text-align: left;
    }
`;

const StyleImg = styled.img`
    width: 48px;
`

const StyledText = styled.p`
    margin: 0 10px 0;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex: 1;
`

const StyledModal = styled(Modal)`

`
const StyledForm = styled(Form)`

`
const StyledResultAddFriend = styled.div`
    
`

