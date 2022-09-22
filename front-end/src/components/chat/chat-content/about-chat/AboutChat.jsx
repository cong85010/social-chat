import React from 'react';
import { border } from '~/utils/color';
import styled from 'styled-components';
import { Header, Content } from 'antd/lib/layout/layout';
import { EditOutlined, BellOutlined, UsergroupAddOutlined, PushpinOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Divider, Form, Menu, Radio, Upload } from 'antd';
import Input from 'antd/lib/input/Input';
import MenuItem from 'antd/lib/menu/MenuItem';

function AboutChat() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

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




    return (<StyledSection>
        <StyledHeader>
            <h3>Thông tin hội thoại</h3>
        </StyledHeader>
        <StyledContent>
            <StyledAvatar></StyledAvatar>
            <StyledNameEdit>
                <StyledName>Your Name</StyledName>
                <EditOutlined className='icon-edit' />
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
                                    <StyledMenuitem styled={{height: '46px'}}>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                                <StyledRadio value="option2">
                                    <StyledMenuitem>
                                        <StyledAvatar style={{ width: '44px', height: '44px', marginRight: '8px' }}></StyledAvatar>Nguyen Van A
                                    </StyledMenuitem>
                                </StyledRadio>
                            </StyledRadioGroup>
                        </Menu>

                    </Form.Item>
                </StyledListRecentlyChat>
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
    font-size: 14px;
    display: inline-block;
    margin: 0;
`

const StyledRadioGroup = styled(Radio.Group)`
    display: flex;
    flex-direction: column;
    
`
const StyledRadio = styled(Radio)`
    margin-top: 10px;
`
const StyledListRecentlyChat = styled.div`
    ::-webkit-scrollbar{
        width: 10px;
    }
`
const StyledMenuitem = styled(Menu.Item)`
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
        background-color: transparent;
    }
    .ant-menu-item.ant-menu-item-active.AboutChat__StyledMenuitem-sc-170bdvy-17{
        height: 50px !important;
    }
`