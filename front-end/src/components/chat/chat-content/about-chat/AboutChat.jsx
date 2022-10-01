import React from 'react';
import { border, borderInfor } from '~/utils/color';
import styled from 'styled-components';
import { Header, Content } from 'antd/lib/layout/layout';
import { EditOutlined, BellOutlined, UsergroupAddOutlined, PushpinOutlined, SettingOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Collapse, Divider, Form, Menu, Radio, Upload } from 'antd';
import Input from 'antd/lib/input/Input';
import MenuItem from 'antd/lib/menu/MenuItem';


function AboutChat() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpenInfor, setIsOpenInFor] = useState(false);
    const [isOpenRename, setIsOpenRename] = useState(false);
    const { Panel } = Collapse;


    const handleShowModalTurnOffMess = () => {
        setIsOpen1(true)
    }

    const handleOKModalTurnOffMess = () => {
        setIsOpen1(false)
    }

    const handleCancelModalTurnOffMess = () => {
        setIsOpen1(false)
    }

    const handleShowModalCreatGroup = () => {
        setIsOpen2(true)
    }

    const handleOKModalCreatGroup = () => {
        setIsOpen2(false)
    }

    const handleCancelModalCreatGroup = () => {
        setIsOpen2(false)
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


    return (<StyledSection>
        <StyledHeader>
            <h3>Thông tin hội thoại</h3>
        </StyledHeader>
        <StyledContent>
            <StyledAvatar onClick={handleShowModalInfor}></StyledAvatar>
            <StyledNameEdit>
                <StyledName>Your Name</StyledName>
                <EditOutlined className='icon-edit' onClick={handleShowModalRename} />
            </StyledNameEdit>
            <StyledFunction>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff onClick={handleShowModalTurnOffMess}>
                        <BellOutlined />
                        <StyledFunctionName>Tắt thông báo</StyledFunctionName>
                    </StyledFunctionTurnOff>
                    {/* <StyledFunctionActive>
                        <StyledFunctionName>Bật thông báo</StyledFunctionName>
                    </StyledFunctionActive> */}
                </StyledFunctionIcon>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff>
                        <PushpinOutlined />
                        <StyledFunctionName>Ghim hội thoại</StyledFunctionName>
                    </StyledFunctionTurnOff>
                    {/* <StyledFunctionActive>
                        <PushpinOutlined />
                        <StyledFunctionName>Bỏ ghim hội thoại</StyledFunctionName>
                    </StyledFunctionActive> */}
                </StyledFunctionIcon>
                <StyledFunctionIcon>
                    <StyledFunctionTurnOff onClick={handleShowModalCreatGroup}>
                        <UsergroupAddOutlined />
                        <StyledFunctionName>Tạo nhóm trò chuyện</StyledFunctionName>
                    </StyledFunctionTurnOff>
                    {/* <StyledFunctionActive>
                        <UsergroupAddOutlined />
                        <StyledFunctionName>Thêm thành viên</StyledFunctionName>
                    </StyledFunctionActive> */}
                </StyledFunctionIcon>
                {/* Khi nào vào nhóm , thì mới bật cái này */}
                {/* <StyledFunctionIconInGroup>
                    <SettingOutlined />
                    <StyledFunctionName>Quản lí nhóm</StyledFunctionName>
                </StyledFunctionIconInGroup> */}

            </StyledFunction>
            <StyledCollapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="Ảnh/Video" key="1" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '12px' }} >Xem tất cả</StyledButton>
                </Panel>
                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>
                <Panel header="File" key="2" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '12px' }} >Xem tất cả</StyledButton>
                </Panel>
                <StyledBorder style={{ width: '100%', position: 'relative', backgroundColor: '#fffcfc00', top: 0 }}></StyledBorder>

                <Panel header="Link" key="3" className="site-collapse-custom-panel">
                    <StyledButton key="submit" style={{ top: '-10px', left: '12px' }} >Xem tất cả</StyledButton>
                </Panel>
            </StyledCollapse>
        </StyledContent>
        <StyledFunction>
        </StyledFunction>
        <StyledModal title="Xác nhận" open={isOpen1} onCancel={handleCancelModalTurnOffMess} onOk={handleOKModalTurnOffMess}
            footer={[
                <Button key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalTurnOffMess}>Hủy</Button>,
                <Button key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalTurnOffMess} type="primary">Đồng ý</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }}
                // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                autoComplete="off">
                <Form.Item>
                    <StyledText>Bạn có chắc chắn muốn tắt thông báo hội thoại này:</StyledText>
                    <StyledRadioGroup>
                        <StyledRadio value="option1">Trong 1 giờ</StyledRadio>
                        <StyledRadio value="option2">Trong 4 giờ</StyledRadio>
                        <StyledRadio value="option3">Trong 8 giờ</StyledRadio>
                        <StyledRadio value="option4">Đến khi tôi bật lại</StyledRadio>
                    </StyledRadioGroup>
                </Form.Item>
            </StyledForm>
        </StyledModal>
        <StyledModal title="Tạo nhóm" open={isOpen2} onCancel={handleCancelModalCreatGroup} onOk={handleOKModalCreatGroup}
            footer={[
                <Button key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalCreatGroup}>Hủy</Button>,
                <Button key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalCreatGroup} type="primary">Đồng ý</Button>

            ]}>
            <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 24 }} initialValues={{ remember: false }}
                // onFinish={onFinish} onFinishFailed={onFinishFailed} 
                autoComplete="off">
                <Form.Item valuePropName="fileList">
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
                            <StyledRadioGroup>
                                <StyledRadio value="option1">
                                    <StyledMenuitem style={{ backgroundColor: 'transparent', color: '#333', fontWeight: '500' }}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                                <StyledRadio value="option2">
                                    <StyledMenuitem style={{ backgroundColor: 'transparent', color: '#333', fontWeight: '500' }}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                                <StyledRadio value="option3">
                                    <StyledMenuitem style={{ backgroundColor: 'transparent', color: '#333', fontWeight: '500' }}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                                <StyledRadio value="option4">
                                    <StyledMenuitem style={{ backgroundColor: 'transparent', color: '#333', fontWeight: '500' }}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                                <StyledRadio value="option5">
                                    <StyledMenuitem style={{ backgroundColor: 'transparent', color: '#333', fontWeight: '500' }}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                                <StyledRadio value="option6">
                                    <StyledMenuitem style={{ backgroundColor: 'transparent', color: '#333', fontWeight: '500' }}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                            </StyledRadioGroup>
                        </Menu>

                    </Form.Item>
                </StyledListRecentlyChat>
            </StyledForm>
        </StyledModal>
        <StyledModal title="Thông tin tài khoản" open={isOpenInfor} onCancel={handleCancelModalInfor} onOk={handleOKModalInfor}
            footer={[
                <Button key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalInfor}>Hủy</Button>,
                <Button key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalInfor} type="primary">Đồng ý</Button>

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
                        <EditOutlined className='icon-edit' onClick={handleShowModalRename} />
                    </StyledNameEdit>
                </Form.Item>
                <Form.Item>
                    <StyledButton key="back" style={{ left: '38px' }}>Nhắn tin</StyledButton>,
                    <StyledButton key="submit" style={{ left: '80px' }} >Gọi điện</StyledButton>
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
                <Button key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalRename}>Hủy</Button>,
                <Button key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalRename} type="primary">Đồng ý</Button>

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

    </StyledSection>);
}

export default AboutChat;

const StyledSection = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border-left: 1px solid ${border};
`
const StyledHeader = styled(Header)`
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

const StyledFunction = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
    padding: 0 30px;
    margin-top: 15px;
`

const StyledFunctionIcon = styled.div`
    width: calc(33.33333% - 30px);
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
`
const StyledListRecentlyChat = styled.div`
    max-height: 26vh;
    overflow-y: auto;
`
const StyledMenuitem = styled(MenuItem)`
    .ant-menu-item-active{
        display: none;
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
const StyledDetailInfor = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledContainInfor = styled.div`
    position: relative;
    top: -30px;
`

const StyledCollapse = styled(Collapse)`
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