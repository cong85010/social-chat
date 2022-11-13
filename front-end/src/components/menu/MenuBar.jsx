import {
    AudioOutlined, CloudOutlined, ContactsOutlined, LogoutOutlined, MessageOutlined, PlusOutlined, UserAddOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Menu, Modal, Radio, Skeleton, Space, Tabs, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getConversationAllByToken } from '~/redux/slices/ConversationSlice';
import { saveUserChat } from '~/redux/slices/UserChatSlice';
import { logout } from '~/redux/slices/UserSlice';
import { bgborder, border, borderInfor, primaryColor } from '~/utils/color';
import { beforeUpload, getBase64, URL } from '~/utils/constant';
import { getToken } from '~/utils/function';
import { HeaderIcon } from '../../utils/Layout';
import AvatarAddFriend from './content/AvatarAddFriend';
import AvatarImg from './content/AvatarImg';
import AvatarItem from './content/AvatarItem';
import AvatarItemListAddFriend from './content/AvatarItemListAddFriend';
import AvatarItemListCheckedUsers from './content/AvatarItemListCheckedUsers';
import AvatarItemNoHours from './content/AvatarItemNoHours';
import MenuIcon from './MenuIcon';

const CheckboxGroup = Checkbox.Group;

function MenuBar() {
    const [friend, setFriend] = useState(false);
    const [listAdd, setListAdd] = useState(false);
    const [listGroup, setListGroup] = useState(false);
    const [logOut, setLogOut] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenInfor, setIsOpenInFor] = useState(false);
    const [option, setOption] = useState('chat');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: userId, accessToken } = useSelector(state => state.user.user)
    const { conversations, isLoading: isLoadingConversations } = useSelector(state => state.conversation)
    const { userChat } = useSelector(state => state.userChat)

    const [findFriend, setFindFriend] = useState();
    const [findMyFriends, setFindMyFriends] = useState([]);
    const [friendInvited, setFriendInvited] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [nameGroup, setNameGroup] = useState("");
    const [listChecked, setListChecked] = useState([]);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);

    // search moi them
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["name"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    //


    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setIsLoading(true);
            return;
        }

        if (info.file.status === 'removed') {
            setImageUrl(null)
            return;
        }

        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            setIsLoading(false);
            setImageUrl(url);
        });


    };

    // MenuIcon
    const renderItems2 = () => bottomItems.map((bottomItem, index) => <MenuIcon>{bottomItem.icon}</MenuIcon>);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const onFinishFindFriend = async (value) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/user/phone-number/${value.phone}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })
            setFindFriend(data)
            dispatch(getConversationAllByToken(accessToken))
        } catch (error) {

            setFindFriend({
                code: 404,
                message: "Không tìm thấy !!!"
            })
        }
        setIsLoading(false)
    };

    const getFriendInvited = async (value) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/friend-request/get-friend-request`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })

            setFriendInvited(data)
        } catch (error) {

            setFindFriend({
                code: 404,
                message: "Không có lời mời nào"
            })
        }
        setIsLoading(false)
    };

    const getMyFriends = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/user/get-list-friend`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })

            setFindMyFriends(data?.data)
        } catch (error) {
            setFindMyFriends({
                code: 404,
                message: "Không có bạn bè nào"
            })
        }
        setIsLoading(false)
    };

    const handleChangeNameGroup = (text) => {
        setNameGroup(text.target.value)
    }

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

    const handleShowModalListAdd = () => {
        setListAdd(true)
        getFriendInvited()
    }
    const handleShowModalOKListAdd = () => {
        setListAdd(false)
    }
    const handleShowModalCancelListAdd = () => {
        setListAdd(false)
    }

    const handleShowModalListGroup = () => {
        setListGroup(true)
    }
    const handleShowModalOKListGroup = () => {
        setListGroup(false)
    }
    const handleShowModalCancelListGroup = () => {
        setListGroup(false)
    }

    const handleShowModalCreatGroup = () => {
        setIsOpen(true)
        getMyFriends()
    }

    const handleOKModalCreatGroup = async () => {
        try {
            setIsLoadingCreate(true)
            const { data } = await axios.post(`${URL}/api/conversation/create-group`, {
                avatar: imageUrl,
                listMemberId: listChecked,
                name: nameGroup,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })

            if (data?.code === 200) {
                dispatch(getConversationAllByToken(accessToken))
                setImageUrl(null)
            }

            setIsLoadingCreate(false)
            setIsOpen(false)
        } catch (error) {
            setIsLoadingCreate(false)
            setIsOpen(false)
            setImageUrl(null)
        }
    }

    const handleCancelModalCreatGroup = () => {
        setIsOpen(false)
    }

    const handleShowModalInfor = () => {
        setIsOpenInFor(true)
    }

    const handleOKModalInfor = () => {
        setIsOpenInFor(false)
    }

    const handleCancelModalInfor = () => {
        setIsOpenInFor(false)
    }

    const onChangeAddToGroup = (list) => {
        setListChecked(list)
    }

    useEffect(() => {
        dispatch(getConversationAllByToken(accessToken))
    }, [])

    useEffect(() => {
        if (conversations.length) {
            if (!userChat)
                dispatch(saveUserChat(conversations[0]))
        }
    }, [conversations, dispatch, userChat, isLoadingConversations])

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
    // search moi them
    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json"
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    // setError(error);
                }
            );
    }, []);
    const data = Object.values(items);

    function search(items) {
        return items.filter((item) => {
            if (item.name == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    //  Tab Menu
    const tabMenu = () => {
        return (
            <StyledTabs defaultActiveKey="1">
                <Tabs.TabPane tab="Tất cả" key="1">

                    {isLoadingConversations ?
                        [1, 2, 4, 5, 6].map(x => <div style={{ padding: '10px' }}> <Skeleton avatar paragraph={{ rows: 1 }} /></div>) :
                        conversations.map((conversation, index) => (
                            <AvatarItem
                                isLoading={isLoading}
                                key={index}
                                index={conversation.id}
                                userIdCurrent={userId}
                                adminId={conversation.adminId}
                                {...conversation}
                            />
                        ))}
                        {/* search moi them */}
                    {search(data).map((conversation, index) => (
                        <AvatarItem
                            isLoading={isLoading}
                            key={index}
                            index={conversation.id}
                            userIdCurrent={userId}
                            adminId={conversation.adminId}
                            {...conversation}
                        />
                    ))}
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Chưa đọc" key="2">
                    {users.map((user, index) => (
                        <AvatarItem
                            isLoading={isLoading}
                            key={index}
                            index={user._id}
                            name={user.name}
                            content={user.content}
                            avatar={user.avatar}
                        />
                    ))}
                </Tabs.TabPane> */}
            </StyledTabs>
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
                    {findMyFriends?.map((user, index) => (
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
            icon: <LogoutOutlined onClick={handleLogout} />,
        },
    ];

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
                        <Search placeholder="Tìm Kiếm" allowClear value={q}
                            onChange={(e) => setQ(e.target.value)} />
                    </Space>
                    <HeaderIcon onClick={handleShowModalAddFriend} >
                        <UserAddOutlined />
                    </HeaderIcon>
                    <HeaderIcon onClick={handleShowModalCreatGroup}>
                        <UsergroupAddOutlined />
                    </HeaderIcon>
                </HeaderSearch>
                {option === 'chat' ? <TabMenuItem>{tabMenu()}</TabMenuItem> : null}
                {option === 'contact' ? <TabMenuItem>{tabContact()}</TabMenuItem> : null}

            </EndWrapper>
            {/* Modal Add friend */}
            <StyledModal title="Tìm bạn bè" open={friend} onCancel={handleShowModalCancelAddFriend} onOk={handleShowModalOKAddFriend}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelAddFriend}>Hủy</Button>,
                    // <Button key="submit" style={{ fontWeight: 700 }} type="primary" htmlType='submit' >Tìm kiếm</Button>
                ]}>
                <StyledForm
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishFindFriend}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name='phone' style={{ marginBottom: '8px' }}
                        rules={[
                            {
                                required: true,
                                pattern: /^0[0-9]{9}$/,
                                message: 'Vui lòng nhập số điện thoại của bạn!',
                            },
                        ]}>
                        <Input placeholder='Nhập số điện thoại cần tìm' />
                    </Form.Item>
                </StyledForm>
                <StyledResultAddFriend>
                    <StyledText>Kết quả tìm kiếm</StyledText>
                    {
                        findFriend?.code === 200 ?
                            <AvatarAddFriend
                                {...findFriend?.data}
                            ></AvatarAddFriend> : findFriend?.message
                    }
                </StyledResultAddFriend>
            </StyledModal>

            {/* Modal show dsach loi moi ket ban */}
            <StyledModal centered title="Danh sách kết bạn" open={listAdd} onCancel={handleShowModalCancelListAdd} onOk={handleShowModalOKListAdd}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelListAdd}>Hủy</Button>,
                    <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleShowModalOKListAdd}>Đồng ý</Button>
                ]}>

                <StyledResultAddFriend>
                    {friendInvited?.code === 200 ? friendInvited.data?.map((user, index) => (
                        <AvatarItemListAddFriend
                            key={index}
                            index={user._id}
                            idFriend={user.id}
                            closeModal={handleShowModalCancelListAdd}
                            {...user.fromUser}
                        ></AvatarItemListAddFriend>
                    )) : friendInvited?.message}
                </StyledResultAddFriend>
            </StyledModal>

            <StyledModal centered title="Danh sách nhóm" open={listGroup} onCancel={handleShowModalCancelListGroup} onOk={handleShowModalOKListGroup}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleShowModalCancelListGroup}>Hủy</Button>,
                    <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleShowModalOKListGroup}>Đồng ý</Button>
                ]}>

                <StyledResultAddFriend>
                    {/* {usersFind.map((user, index) => (
                        <AvatarItemListGroup
                            key={index}
                            index={user._id}
                            name={user.name}
                            avatar={user.avatar}
                        ></AvatarItemListGroup>
                    ))} */}
                </StyledResultAddFriend>
            </StyledModal>

            <StyledModal centered title="Tạo nhóm" open={isOpen}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalCreatGroup}>Hủy</Button>,
                    <Button key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalCreatGroup} type="primary" loading={isLoadingCreate}>Tạo nhóm</Button>

                ]}
                destroyOnClose
                onCancel={handleCancelModalCreatGroup}
            >
                <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                    // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                    autoComplete="off"
                >

                    <Form.Item >
                        <Upload action="/" listType="picture-card"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            maxCount={1}
                        >
                            {!imageUrl && <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>}
                        </Upload>
                    </Form.Item>
                    <Form.Item >
                        <Input placeholder='Nhập tên nhóm' onChange={handleChangeNameGroup} />
                    </Form.Item>
                    <Form.Item>
                        <StyledText style={{ fontWeight: 600 }}>Thêm bạn vào nhóm</StyledText>
                        <Input placeholder='Nhập tên, số điện thoại' style={{ borderRadius: '10px' }} />
                    </Form.Item>
                    <Divider style={{ margin: '16px 0 8px' }}></Divider>
                    <StyledText style={{ fontWeight: 600 }}>Trò chuyện gần đây</StyledText>
                    <StyledListRecentlyChat>
                        <Form.Item>
                            <Menu>
                                <CheckboxGroup onChange={onChangeAddToGroup}>
                                    {findMyFriends?.map((user, index) => (
                                        <Checkbox value={user.id} style={{ margin: 0 }}>
                                            <AvatarItemListCheckedUsers key={index}
                                                index={user.id}
                                                name={user.name}
                                                avatar={user.avatar}
                                            />
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </Menu>

                        </Form.Item>
                    </StyledListRecentlyChat>
                </StyledForm>
            </StyledModal>
            <StyledModal centered title="Thông tin tài khoản" open={isOpenInfor} onCancel={handleCancelModalInfor} onOk={handleOKModalInfor}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalInfor}>Hủy</Button>,
                    <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalInfor} type="primary">Đồng ý</Button>

                ]}>
                <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }}
                    // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                    autoComplete="off">
                    <Form.Item>
                        <StyledAvatarNen></StyledAvatarNen>
                        <StyledAvatar style={{ position: 'relative', top: '-64px', left: '56%', border: '3px solid white', width: '80px', height: '80px' }}></StyledAvatar>
                    </Form.Item>
                    <Form.Item>
                        <StyledNameEdit style={{ position: 'absolute', top: '-76px', left: '50%' }}>
                            <StyledName>Your Name</StyledName>
                        </StyledNameEdit>
                    </Form.Item>
                    <StyledBorder></StyledBorder>
                    <Form.Item>
                        <StyledContainInfor>
                            <StyledText style={{ top: '-30px' }}><h3>Thông tin cá nhân</h3></StyledText>
                            <StyledDetailInfor>
                                <StyledText>Số điện thoại</StyledText>
                                <StyledText>0123456789</StyledText>
                            </StyledDetailInfor>
                            <StyledDetailInfor>
                                <StyledText>Giới tính</StyledText>
                                <StyledText>Nữ</StyledText>
                            </StyledDetailInfor>
                            <StyledDetailInfor>
                                <StyledText>Ngày sinh</StyledText>
                                <StyledText>2001/09/08</StyledText>
                            </StyledDetailInfor>
                        </StyledContainInfor>
                    </Form.Item>
                </StyledForm>
            </StyledModal>
        </Wrapper >
    );
}

export default MenuBar;

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    height: 100%;
    border-right: 1px solid ${border};
    width: 100%;
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
export const TabMenuItem = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
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
    .ant-tabs-nav {
        padding: 0 15px;
        margin: 0;
    }
    .ant-tabs {
        width: 100%;
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
const StyledResultAddFriend = styled.div`
    
`

const StyledTabs = styled(Tabs)`
    
`

const StyledModal = styled(Modal)`
`
const StyledForm = styled(Form)`
    .ant-form-item{
        margin: 0 0 10px;
    }
    input{
        margin-top: 8px;
    }
`

const StyledRadioGroup = styled(Radio.Group)`
    display: flex;
    flex-direction: column;
    
`
const StyledRadio = styled(Radio)`
    margin-top: 4px;
    &.ant-menu-item-selected{
        background-color: transparent;
    }
`
const StyledListRecentlyChat = styled.div`
    max-height: 26vh;
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
`
const StyledAvatarNen = styled.img`
    background-image: url('https://info-imgs.vgcloud.vn/2022/01/03/13/gap-go-con-meo-hai-mat-ky-la-noi-tieng-khap-mang-xa-hoi.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 520px;
    height: 200px;
    cursor: pointer;
    padding: 0;
    position: relative;
    top: -24px;
    left: -24px;
`
const StyledAvatar = styled.img`
    background-image: url('https://img4.thuthuatphanmem.vn/uploads/2021/06/04/hinh-nen-chu-cho-cory-chan-ngan-tren-duong-ray_032045111.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
`
const StyledNameEdit = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 0;
    flex-direction: row;
    .icon-edit{
        font-size: 1.2em;
        line-height: 1.4em;
        background-color: ${border};
        border-radius: 50%;
        width: 1.4em;
        height: 1.4em;
        opacity: 0.8;
    }
`

const StyledName = styled.h2`
    min-width: 50px;
    margin: 0 8px;
`
const StyledButton = styled(Button)`
    font-weight: 700;
    width:175px;
    top:-60px;
    background-color: ${borderInfor};
    border-radius: 4px;
`
const StyledBorder = styled.div`
    border-bottom: 8px solid ${borderInfor};
    width: 520px;
    position: absolute;
    bottom: 264px;
    left: 0;
`
const StyledContainInfor = styled.div`
    position: relative;
    top: -30px;
`
const StyledDetailInfor = styled.div`
    display: flex;
    justify-content: space-between;
    width: 132%;
`
