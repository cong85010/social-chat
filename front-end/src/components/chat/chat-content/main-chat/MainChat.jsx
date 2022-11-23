import {
    EditOutlined,
    FileAddOutlined,
    FileExclamationOutlined,
    FolderAddOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined,
    PhoneOutlined, PlusOutlined,
    SmileOutlined, UsergroupAddOutlined, VideoCameraOutlined
} from '@ant-design/icons';
import { Avatar, Button, Checkbox, Divider, Form, Input, Menu, Modal, Popover, Radio, Upload } from 'antd';
import axios from 'axios';
import { ObjectID } from 'bson';
import React, { useEffect, useRef, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { useDispatch, useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styled from 'styled-components';
import AvatarItemListCheckedUsers from '~/components/menu/content/AvatarItemListCheckedUsers';
import { actionReact, updateContentChat } from '~/redux/slices/ChatSlice';
import { getConversationAllByToken, updateSortConversations } from '~/redux/slices/ConversationSlice';
import { bodyChat, border, borderInfor, primaryColor } from '~/utils/color';
import { AvatarDefault, URL } from '~/utils/constant';
import { ContentAbout, ContentName, HeaderIcon, IconItemInput, ItemContent } from '~/utils/Layout';
import FriendChat from './frient-chat/FriendChat';
import MyChat from './my-chat/MyChat';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import { getToken } from '~/utils/function';

const CheckboxGroup = Checkbox.Group;

function MainChat({ isShowAbout, setIsShowAbout, selectedUser, userID }) {
    // Click change layout
    const [form] = Form.useForm();
    const { id: userId, accessToken } = useSelector(state => state.user.user)
    const { userChat } = useSelector(state => state.userChat)
    const { chat } = useSelector(state => state.chat)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConected] = useState(false);
    const [isOpenInFor, setIsOpenInFor] = useState(false);
    const [isOpenRename, setIsOpenRename] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const [findMyFriends, setFindMyFriends] = useState([]);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [nameGroup, setNameGroup] = useState("");


    //use your link here
    const sock = new SockJS(`${URL}/ws`);
    const stompClient = Stomp.over(sock);

    const users = [{
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
        _id: '3',
        name: 'Lê Tuấn',
        content: 'Hi Chau!!',
        avatar: 'https://s120-ava-talk.zadn.vn/c/f/3/5/20/120/e83b009221d944ac707d41f4da3e138e.jpg',
    },
    ]

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

    const handleShowModalRename = () => {
        setIsOpenRename(true)
    }

    const handleOKModalRename = () => {
        setIsOpenRename(false)
    }

    const handleCancelModalRename = () => {
        setIsOpenRename(false)
    }
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

    const onChangeAddToGroup = (list) => {
        setListChecked(list)
    }



    const sendChat = (text) => {

        let isFile = false
        let _content = text;
        if (fileList.length) {
            const id = new ObjectID();
            _content = id;
            isFile = true;
        }
        var chatMessage = {
            conversationId: userChat.id,
            content: [_content],
            type: isFile ? 1 : 0,
            accessToken: user.accessToken
        };

        if (isFile) {
            var bodyFormData = new FormData();
            bodyFormData.append('file', fileList[0]?.originFileObj);
            bodyFormData.append('id', `${userChat.id}-${_content}`);

            axios({
                method: "post",
                url: `${URL}/api/message/upload-message-file`,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.accessToken}`, },
            }).then(({ data }) => {
                dispatch(updateContentChat({
                    ...data.data,
                    senderId: user.id,
                    type: 1,
                }))
                const chatMessage = {
                    conversationId: userChat.id,
                    content: [data.data.url],
                    type: isFile ? 1 : 0,
                    accessToken: user.accessToken
                };
                stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            })
            setFileList([])
        } else {
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        }
        dispatch(updateSortConversations(userChat.id))
    };

    const revertChat = (messageId) => {
        const chatMessage = {
            messageId,
            accessToken: user.accessToken
        };
        stompClient.send("/app/chat.revertMessage", {}, JSON.stringify(chatMessage));
    }


    const handleReaction = (messageId, type) => {

        const chatMessage = {
            messageId,
            typeReact: actionReact.indexOf(type),
            accessToken: user.accessToken
        };

        stompClient.send("/app/chat.reactMessage", {}, JSON.stringify(chatMessage));
    }

    useEffect(() => {

        if (!isConnected) {
            sock.onopen = function () {
                console.log('open');
            }

            stompClient.connect({}, function (frame) {
                stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
                    console.log(chat);
                    const message = JSON.parse(chat.body)
                    dispatch(updateContentChat(message))
                    form.resetFields()
                });
            });
            setIsConected(true)
        }

    }, [sock, isConnected, stompClient, user.id, dispatch, form])

    const handleChange = (info) => {
        let newFileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-4);

        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        setFileList(newFileList);
    };
    const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: handleChange,
        multiple: true,
    };

    //Scroll To Bottom
    const messageEl = useRef(null);

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])
    return (
        <Wrapper isShowAbout={isShowAbout}>
            <HeaderWrapper>
                <ItemContent onClick={handleShowModalInfor}>
                    <Avatar
                        size={48}
                        src={userChat.avatar || AvatarDefault}
                    />
                </ItemContent>
                <ContentHeaderChat>
                    <UserContent>
                        <ContentName>{userChat.name}</ContentName>
                        <ContentAbout>{userChat.timeConnect}</ContentAbout>
                    </UserContent>

                    <IconContent>
                        <HeaderIcon >
                            <UsergroupAddOutlined onClick={handleShowModalCreatGroup} />
                        </HeaderIcon>
                        <HeaderIcon>
                            <PhoneOutlined />
                        </HeaderIcon>
                        <HeaderIcon>
                            <VideoCameraOutlined />
                        </HeaderIcon>
                        <HeaderIcon>
                            {isShowAbout ? (
                                <MenuFoldOutlined onClick={() => setIsShowAbout(!isShowAbout)} />
                            ) : (
                                <MenuUnfoldOutlined onClick={() => setIsShowAbout(!isShowAbout)} />
                            )}
                        </HeaderIcon>
                    </IconContent>
                </ContentHeaderChat>
            </HeaderWrapper>
            {/* Body Chat */}
            <BodyChat ref={messageEl}>
                {
                    chat.content?.map(message =>
                        message.senderId === user.id ?
                            <MyChat message={message} revertChat={revertChat} /> : <FriendChat handleReaction={handleReaction} message={message} revertChat={revertChat} />
                    )
                }
            </BodyChat>
            <IconInput >
                <IconItemInput>
                    <StyledUpload {...props} fileList={fileList}>
                        <FileAddOutlined />
                    </StyledUpload>
                </IconItemInput>
                <IconItemInput>
                    <StyledUpload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" style={{ position: 'relative' }}
                        accept=".png,.jpg,.doc,.jpeg">
                        <FolderAddOutlined />
                    </StyledUpload>
                </IconItemInput>
                <IconItemInput>
                    <FileExclamationOutlined />
                </IconItemInput>
            </IconInput>
            <InputEmoji
                id='chatForm'
                // value={text}
                // onChange={setText}
                cleanOnEnter
                onEnter={sendChat}
                placeholder="Nhập nội dung..."
                onResize
                maxLength="500"
            />
            < StyledModal title="Tạo nhóm" open={isOpen} onCancel={handleCancelModalCreatGroup} onOk={handleOKModalCreatGroup}
                footer={
                    [
                        <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalCreatGroup}>Hủy</Button>,
                        <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalCreatGroup} type="primary">Đồng ý</Button>

                    ]} >
                <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                    // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                    autoComplete="off">
                    <Form.Item valuePropName="fileList" style={{ textAlign: 'center' }}>
                        <Upload action="/upload.do" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                        <Input placeholder='Nhập tên nhóm' />
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
            <StyledModal className='infor' title="Thông tin tài khoản" open={isOpenInFor} onCancel={handleCancelModalInfor} onOk={handleOKModalInfor}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalInfor}>Hủy</Button>,
                    <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalInfor} type="primary">Đồng ý</Button>

                ]}>
                <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }}
                    // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                    autoComplete="off">
                    <Form.Item>
                        <StyledAvatarNen></StyledAvatarNen>
                    </Form.Item>
                    <Form.Item>
                        <StyledAvatar style={{ display: 'initial', position: 'absolute', top: '-75px', left: '50%', border: '3px solid white', width: '80px', height: '80px' }}></StyledAvatar>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <StyledNameEdit>
                            <StyledName>Your Name<EditOutlined className='icon-edit' onClick={handleShowModalRename} /> </StyledName>
                        </StyledNameEdit>
                    </Form.Item>
                    <Form.Item>
                        <StyledButton loading={isLoading} onkey="back" style={{ left: '20px' }}>Nhắn tin</StyledButton>,
                        <StyledButton loading={isLoading} key="submit" style={{ left: '70px' }} >Gọi điện</StyledButton>
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
            <StyledModal title="Đặt tên gợi nhớ" open={isOpenRename} onCancel={handleCancelModalRename} onOk={handleOKModalRename}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalRename}>Hủy</Button>,
                    <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalRename} type="primary">Đồng ý</Button>

                ]}>
                <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                    // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                    autoComplete="off">
                    <Form.Item>
                        <StyledAvatar style={{ position: 'relative', left: '42%' }}></StyledAvatar>
                        <StyledText style={{ display: 'flex', justifyContent: 'center', margin: '6px 0', fontSize: '16px', fontWeight: 500 }}>Hãy đặt một cái tên dễ nhớ</StyledText>
                        <Input />
                    </Form.Item>
                </StyledForm>
            </StyledModal>
        </Wrapper >
    );
}

export default MainChat;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0 0 auto;
    width: ${p => p.isShowAbout ? 'calc(100% - 343px)' : '100%'};
    /* width: 100%; */
    height: 100%;
    flex-flow: row wrap;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 68px;
    padding: 0 16px;
    border-bottom: 1px solid ${border};
`;
const ContentHeaderChat = styled.div`
    display: flex;
    width: calc(100% - 64px);
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;
const IconContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;
/* Body Chat */
const BodyChat = styled.div`
    /* display: flex; */
    flex-direction: column;
    /* justify-content: flex-end; */
    width: 100%;
    height: calc(100% - 169px);
    background-color: ${bodyChat};
    overflow-y: scroll;
    padding-top: 490px;
    &::-webkit-scrollbar {
        position: relative;
        width: 6px;
        background-color: #ffff;
    }
    &::-webkit-scrollbar-track {
        position: absolute;
    }
    &::-webkit-scrollbar-thumb {
        position: absolute;
        background-color: ${border};
    }
    aside.EmojiPickerReact{
        position: absolute;
        bottom: 102px;
        height: 350px !important;
    }
`;
/* Icon Chat */
const IconInput = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 46px;
    padding-left: 16px;
    border-top: 1px solid ${border};
`;

/* Form Chat */
const FormChat = styled(Form)`
    display: flex;
    padding: 0 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    width: 100%;
    border-top: 1px solid ${primaryColor};
`;

const StyledModal = styled(Modal)`
    &.infor{
        width: 380px !important;
    }
`
const StyledForm = styled(Form)`
    .ant-form-item{
        margin: 0 0 10px;
    }
    input{
        margin-top: 8px;
    }
    .ant-upload-list-picture-card .ant-upload-list-item-error{
        border-color: ${primaryColor};
    }
    .ant-tooltip-inner,
    .ant-tooltip-arrow{
        display: none;
    }
`
const StyledText = styled.p`
    font-size: 16px;
    margin: 0;
    display: inline;
    margin: 4px 0;
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
const StyledNameEdit = styled.div`
    position: relative;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .icon-edit{
        font-size: 1em;
        line-height: 1.4em;
        background-color: ${border};
        border-radius: 50%;
        width: 1.4em;
        height: 1.4em;
        opacity: 0.8;
        margin-left: 10px;
    }
`
const StyledName = styled.h2`
    min-width: 50px;
    margin: 0 8px;
`
const StyledAvatarNen = styled.img`
    background-image: url('https://info-imgs.vgcloud.vn/2022/01/03/13/gap-go-con-meo-hai-mat-ky-la-noi-tieng-khap-mang-xa-hoi.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 380px;
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
const StyledButton = styled(Button)`
    font-weight: 700;
    width:120px;
    top:-46px;
    background-color: transparent;
    border-radius: 4px;
`
const StyledDetailInfor = styled.div`
    display: flex;
    justify-content: space-between;
    width: 132%;
`

const StyledContainInfor = styled.div`
    position: relative;
    top: -30px;
`
const StyledBorder = styled.div`
    border-bottom: 8px solid ${borderInfor};
    width: 380px;
    position: absolute;
    bottom: 264px;
    left: 0;
`

const StyledUpload = styled(Upload)`
    .ant-upload-list-picture .ant-upload-list-item{
        background-color: #fff;
        z-index: 1;
    }
    .ant-upload-list.ant-upload-list-picture,
    .ant-upload-list.ant-upload-list-text{
        position: absolute;
        bottom: 110px;
    }
    .ant-upload-list-item-name{
        height: 30px;
    }
    .ant-upload-list-text-container{
        background: #fff;
        border-radius: 4px;
        line-height: 30px;
        margin-top: 4px;
    }
    .ant-tooltip-placement-top{
        display: none;
    }
    .ant-upload-list {
        z-index: 1;
    }
    .ant-upload-list-item-name{
        color: ${primaryColor};
    }
`