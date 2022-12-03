import React from 'react';
import { border, borderInfor, text } from '~/utils/color';
import styled from 'styled-components';
import { Header, Content } from 'antd/lib/layout/layout';
import { EditOutlined, BellOutlined, UsergroupAddOutlined, PushpinOutlined, SettingOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Collapse, Divider, Form, Menu, Radio, Upload, message, Checkbox, Space, Row, Popconfirm, Image, Spin } from 'antd';
import Input from 'antd/lib/input/Input';
import MenuItem from 'antd/lib/menu/MenuItem';
import AvatarItemListCheckedUsers from '~/components/menu/content/AvatarItemListCheckedUsers';
import AvatarMember from '~/components/menu/content/AvatarMember';
import { type } from '@testing-library/user-event/dist/type';
import { useSelector, useDispatch } from 'react-redux';
import { AvatarDefault, beforeUpload, getBase64, URL } from '~/utils/constant';
import { getToken } from '~/utils/function';
import axios from 'axios';
import { updateUserChat } from '~/redux/slices/UserChatSlice';
import { getConversationAllByToken } from '~/redux/slices/ConversationSlice';

const CheckboxGroup = Checkbox.Group;

function AboutChat() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpenInfor, setIsOpenInFor] = useState(false);
    const [isOpenRename, setIsOpenRename] = useState(false);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [isAddMemberInGroup, setIsAddMemberInGroup] = useState(false);
    const { Panel } = Collapse;
    const { user } = useSelector(state => state.user)
    const { userChat } = useSelector(state => state.userChat)
    const [isLoading, setIsLoading] = useState(false);
    const [findMyFriends, setFindMyFriends] = useState([]);
    const [listChecked, setListChecked] = useState([]);
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState(null);
    const [nameGroup, setNameGroup] = useState("");
    const [formInfo] = Form.useForm();
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const { conversations, isLoading: isLoadingConversations } = useSelector(state => state.conversation)
    const [isLoadingRemove, setIsLoadingRemove] = useState(false);

    const getMyFriends = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${URL}/api/user/get-list-friend`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })

            if (data?.data) {
                setFindMyFriends(data?.data)
            }

        } catch (error) {
            setFindMyFriends({
                code: 404,
                message: "Không có bạn bè nào"
            })
        }
        setIsLoading(false)
    };


    const handleShowModalTurnOffMess = () => {
        setIsOpen1(true)
    }

    const handleOKModalTurnOffMess = () => {
        setIsOpen1(false)
    }

    const handleCancelModalTurnOffMess = () => {
        setIsOpen1(false)
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

    const handleShowModalMember = () => {
        setIsOpenMember(true)
    }

    const handleOKModalMember = () => {
        setIsOpenMember(false)
    }

    const handleCancelModalMember = () => {
        setIsOpenMember(false)
    }
    // them thanh vien
    const handleShowModalAddMemberInGroup = () => {
        getMyFriends()
        setIsAddMemberInGroup(true)
    }
    const handleCancelModalAddMemberInGroup = () => {
        setIsAddMemberInGroup(false)
    }
    const handleOKModalAddMemberInGroup = async () => {
        const { data } = await axios.post(`${URL}/api/conversation/add-member-conversation-group`, {
            conversationId: userChat.id,
            listMemberId: listChecked
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                Accept: 'application/json',
            },
        })

        message.success('Thêm thành công')

        setIsAddMemberInGroup(false)
    }

    const onChangeAddToGroup = (list) => {
        setListChecked(list)
    }

    const handleRemoveConversation = async (user_id_remove) => {
        try {
            setIsLoadingRemove(true)
            const { data } = await axios.post(`${URL}/api/conversation/remove-member-conversation-group`, {
                conversationId: userChat.id,
                memberId: user_id_remove,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })
            dispatch(updateUserChat(data.data))
            dispatch(getConversationAllByToken(getToken()))
            handleCancelModalMember()
            message.success('Đuổi thành công')
            handleCancelModalMember()
            setIsLoadingRemove(false)
        } catch (error) {
            message.error('Đuổi thất bại')
            setIsLoadingRemove(false)
        }
    }

    const handleUpdateAdminGroup = async (user_id_admin) => {
        try {
            setIsLoadingRemove(true)
            const { data } = await axios.post(`${URL}/api/conversation/change-admin-conversation-group`, {
                conversationId: userChat.id,
                adminId: user_id_admin,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })
            dispatch(updateUserChat(data.data))
            dispatch(getConversationAllByToken(getToken()))
            setIsLoadingRemove(false)

            message.success('Cập nhật trưởng nhóm thành công')
        } catch (error) {
            setIsLoadingRemove(false)
            message.error('Cập nhật trưởng nhóm thất bại')
        }
    }


    const confirm = async () => {
        if (userChat.adminId === user.id) {
            return;
        }

        try {
            setIsLoadingRemove(true)
            const { data } = await axios.post(`${URL}/api/conversation/out-conversation-group/${userChat.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })
            dispatch(updateUserChat(data.data))
            dispatch(getConversationAllByToken(getToken()))
            handleCancelModalMember()
            message.success('Rời nhóm thành công')
            setIsLoadingRemove(false)
        } catch (error) {
            message.error('Rời nhóm thất bại')
            handleCancelModalMember()
            setIsLoadingRemove(false)
        }
    };

    const onFinish = async () => {
        try {
            setIsLoadingCreate(true)
            const { data } = await axios.post(`${URL}/api/conversation/update`, {
                avatar: imageUrl,
                name: nameGroup,
                id: userChat.id
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: 'application/json',
                },
            })

            if (data?.code === 200) {
                dispatch(getConversationAllByToken(getToken()))
                setImageUrl(null)
                handleCancelModalRename()
                formInfo.resetFields()
            }

            setIsLoadingCreate(false)
        } catch (error) {
            setIsLoadingCreate(false)
            setImageUrl(null)
        }
    }

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


    const handleChangeNameGroup = (text) => {
        setNameGroup(text.target.value)
    }

    useEffect(() => {
        formInfo.setFieldValue('avatar', userChat.avatar)
        setImageUrl(userChat.avatar);
        formInfo.setFieldValue('name', userChat.name)
    }, [formInfo, userChat])


    return (<StyledSection>
        <StyledHeader>
            <h3>Thông tin hội thoại</h3>
        </StyledHeader>
        <StyledContent>
            {isLoadingConversations ? <Spin /> :
                <>
                    <StyledAvatar
                        src={userChat?.avatar || AvatarDefault}

                    ></StyledAvatar>
                    <StyledNameEdit className='name-user-about-chat'>
                        <StyledName style={{ textAlign: 'center' }}>{userChat.name}</StyledName>
                        {userChat.type === 1 && <EditOutlined className='icon-edit' onClick={handleShowModalRename} />}
                    </StyledNameEdit></>
            }

            {
                userChat.type === 1 && <StyledFunctionIcon>
                    <StyledFunctionTurnOff onClick={handleShowModalMember}>
                        <SettingOutlined />
                        <StyledFunctionName>Quản lí nhóm</StyledFunctionName>
                    </StyledFunctionTurnOff>

                </StyledFunctionIcon>

            }
            {/* <StyledFunction>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff onClick={handleShowModalTurnOffMess}>
                        <BellOutlined />
                        <StyledFunctionName>Tắt thông báo</StyledFunctionName>
                    </StyledFunctionTurnOff>
                </StyledFunctionIcon>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff>
                        <PushpinOutlined />
                        <StyledFunctionName>Ghim hội thoại</StyledFunctionName>
                    </StyledFunctionTurnOff>
                </StyledFunctionIcon>
        
            </StyledFunction> */}
            <StyledCollapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="Ảnh/Video" key="1" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '38%' }}
                        loading={isLoading} >Xem tất cả</StyledButton>
                </Panel>

                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="File" key="2" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '38%' }}
                        loading={isLoading} >Xem tất cả</StyledButton>
                </Panel>

                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="Link" key="3" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '38%' }}
                        loading={isLoading} >Xem tất cả</StyledButton>
                </Panel>

                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="Thiếp lập bảo mật" key="4" className="site-collapse-custom-panel" >
                    <StyledButton className='btn-top' key="submit"
                        loading={isLoading}>Xóa kết bạn</StyledButton>
                    <StyledButton className='btn-bottom' loading={isLoading} key="submit" style={{ top: '8px', backgroundColor: 'transparent', color: 'red', width: 'auto' }}>Rời khỏi nhóm trò chuyện</StyledButton>
                </Panel>
            </StyledCollapse>
        </StyledContent>
        <StyledFunction>
        </StyledFunction>
        <StyledModal title="Xác nhận" open={isOpen1} onCancel={handleCancelModalTurnOffMess} onOk={handleOKModalTurnOffMess}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalTurnOffMess}>Hủy</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalTurnOffMess} type="primary">Đồng ý</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                autoComplete="off">
                <Form.Item>
                    <StyledText>Bạn có chắc chắn muốn tắt thông báo hội thoại này:</StyledText>
                    <StyledRadioGroup>
                        <StyledRadio value="option1" >Trong 1 giờ</StyledRadio>
                        <StyledRadio value="option2">Trong 4 giờ</StyledRadio>
                        <StyledRadio value="option3">Trong 8 giờ</StyledRadio>
                        <StyledRadio value="option4">Đến khi tôi bật lại</StyledRadio>
                    </StyledRadioGroup>
                </Form.Item>
            </StyledForm>
        </StyledModal>
        <StyledModal centered className='infor' title="Thông tin tài khoản" open={isOpenInfor} onCancel={handleCancelModalInfor} onOk={handleOKModalInfor}
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
                        <StyledName>Your Name</StyledName>
                        <EditOutlined className='icon-edit' onClick={handleShowModalRename} />
                    </StyledNameEdit>
                </Form.Item>
                <Form.Item style={{ position: 'relative' }}>
                    <StyledButton className='btn-call' loading={isLoading} key="back" style={{ left: '20px' }}>Nhắn tin</StyledButton>,
                    <StyledButton className='btn-mess' loading={isLoading} key="submit" style={{ left: '70px' }} >Gọi điện</StyledButton>
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
        <StyledModal centered title="Cập nhật" open={isOpenRename} onCancel={handleCancelModalRename}
            destroyOnClose
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalRename}>Hủy</Button>,
                <Button loading={isLoadingCreate} key="submit" style={{ fontWeight: 700 }} onClick={onFinish} type="primary">Đồng ý</Button>

            ]}>
            <StyledForm
                form={formInfo}
                name="basic"
                wrapperCol={{ span: 24 }}
                // onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item name="avatar" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Upload action="/" listType="picture-card"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        maxCount={1}
                    >
                        {!imageUrl ? <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div> : <img src={imageUrl} width={100} alt="avatar" />}
                    </Upload>
                </Form.Item>
                <Form.Item label="Tên nhóm" name="name">
                    <Input placeholder='Nhập tên nhóm' onChange={handleChangeNameGroup} />
                </Form.Item>
            </StyledForm>
        </StyledModal>
        <StyledModal centered title="Danh sách thành viên" open={isOpenMember} onCancel={handleCancelModalMember} onOk={handleOKModalMember}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalMember}>Hủy</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} type="primary" onClick={handleOKModalMember}>Đồng ý</Button>
            ]}>
            <Row justify="space-between">
                <Button loading={isLoading} type='primary' style={{ marginRight: '8px' }} onClick={handleShowModalAddMemberInGroup}>Thêm thành viên mới</Button>
                <Popconfirm
                    placement="topRight"
                    title={userChat.adminId === user.id ? 'Bạn cần thay trưởng nhóm trước khi rời nhóm' : "Xác nhận rời nhóm"}
                    onConfirm={confirm}
                    okText="Xác nhận"
                    cancelText="Huỷ"
                >
                    <Button
                        danger
                        loading={isLoading}
                        type='primary'
                        style={{ marginRight: '8px' }}
                    >
                        Rời nhóm
                    </Button>
                </Popconfirm>

            </Row>
            <Divider />
            {isLoadingRemove && <Row justify='center'><Spin /></Row>}
            <StyledResultAddFriend>
                {userChat?.listMember?.map((userMember, index) => (
                    <AvatarMember
                        key={index}
                        index={userMember.id}
                        id={userMember.id}
                        userCurrentId={user.id}
                        name={userMember.name}
                        avatar={userMember.avatar}
                        isAdmin={userChat.isAdmin}
                        adminId={userChat.adminId}
                        handleRemoveConversation={handleRemoveConversation}
                        handleUpdateAdminGroup={handleUpdateAdminGroup}
                        isLoading={isLoadingRemove}
                    ></AvatarMember>
                ))}
            </StyledResultAddFriend>
        </StyledModal>
        <StyledModal centered title="Thêm thành viên mới vào nhóm" open={isAddMemberInGroup} onCancel={handleCancelModalAddMemberInGroup} onOk={handleOKModalAddMemberInGroup}
            footer={[
                <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalAddMemberInGroup}>Hủy</Button>,
                <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalAddMemberInGroup} type="primary">Đồng ý</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                autoComplete="off">
                <Form.Item>
                    <StyledText style={{ fontWeight: 600 }}>Tìm kiếm bạn bè</StyledText>
                    <Input placeholder='Nhập tên, số điện thoại' style={{ borderRadius: '10px' }} />
                </Form.Item>
                <Divider style={{ margin: '16px 0 8px' }}></Divider>
                <StyledText style={{ fontWeight: 600 }}>Trò chuyện gần đây</StyledText>
                <StyledListRecentlyChat>
                    <Form.Item>
                        <Menu>
                            <CheckboxGroup onChange={onChangeAddToGroup}>
                                {findMyFriends?.filter(u => !userChat?.listMember.find(x => x.id === u.id))?.map((user, index) => (
                                    <Checkbox value={user.id}>
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
    </StyledSection >);
}

export default AboutChat;

const StyledSection = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-left: 1px solid ${border};
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
`
const StyledHeader = styled(Header)`
    text-align: center;
    line-height: 64px;
    background-color: transparent;
    border-bottom: 1px solid ${border};
    h3{
        font-weight: 600;
        font-size: 18px;
    }
`

const StyledContent = styled(Content)`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledAvatar = styled.img`
    background-size: cover;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
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
        font-size: 1.2em;
        line-height: 1.4em;
        background-color: ${border};
        border-radius: 50%;
        width: 1.4em;
        height: 1.4em;
        opacity: 0.8;
    }
    &.name-user-about-chat{
        position: relative;
        top: 0px;
    }
`

const StyledName = styled.h2`
    min-width: 50px;
    margin: 0 8px;
`

const StyledFunction = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    padding: 0 30px;
    margin-top: 15px;
    margin-bottom: 20px;
`

const StyledFunctionIcon = styled.div`
    width: calc(33.33333% - 30px);
    text-align: center;
    cursor: pointer;
    .anticon{
        font-size: 1.2em;
        line-height: 1.4em;
        background-color: ${border};
        border-radius: 50%;
        width: 1.4em;
        height: 1.4em;
        opacity: 0.8;
    }
`

const StyledFunctionName = styled.div`
    font-size: 12px;
    opacity: 0.8;
    font-weight: 500;
`

const StyledFunctionTurnOff = styled.div`
    cursor: pointer;
`

const StyledFunctionActive = styled.div`
    
`

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
    span{
       font-size: 16px;
    }
`
const StyledListRecentlyChat = styled.div`
    max-height: 26vh;
    overflow-y: scroll;
    overflow-x: hidden;
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
const StyledMenuItem = styled(MenuItem)`
    background-color: transparent;
    color: #333;
    font-size: 500;
    min-height: 150px;
    .ant-menu-item-active{
        display: none;
    }
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
const StyledButton = styled(Button)`
    font-weight: 700;
    width:120px;
    background-color: transparent;
    border-radius: 4px;
    &.btn-call{
        top: -45px;
    }
    &.btn-mess{
        top: -45px;
    }
    &.btn-top{
        margin: 0 120px;
    }
    &.btn-bottom{
        margin: 0 80px;
    }
`
const StyledBorder = styled.div`
    border-bottom: 8px solid ${borderInfor};
    width: 380px;
    position: absolute;
    bottom: 264px;
    left: 0;
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

const StyledCollapse = styled(Collapse)`
    margin-top: 20px;
    width: 100%;
    .ant-collapse-content-box,
    .ant-collapse-header{
        background-color: #fff;
    }

    .ant-collapse-content-box{
        padding: 0;
    }

    [data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
    .site-collapse-custom-collapse .site-collapse-custom-panel {
    margin-bottom: 24px;
    overflow: hidden;
    background: #f7f7f7;
    border: 0px;
    border-radius: 2px;
    }
`

const StyledResultAddFriend = styled.div`
    
`