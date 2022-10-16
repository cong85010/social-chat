import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import { Avatar, DatePicker, Input } from 'antd';

import { border, borderInfor, text } from '~/utils/color';
import Modal from 'antd/lib/modal/Modal';
import { Button, Collapse, Divider, Form, Menu, Radio, Upload } from 'antd';
import moment from 'moment/moment';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';


function AvatarImg() {
    const [isOpenInfor, setIsOpenInformation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const handleShowModalInformation = () => {
        setIsOpenInformation(true)
    }

    const handleOKModalInformation = () => {
        setIsOpenInformation(false)
    }

    const handleCancelModalInformation = () => {
        setIsOpenInformation(false)
    }

    const handleShowModalUpdateInformation = () => {
        setIsOpen(true)
    }

    const handleOKModalUpdateInformation = () => {
        setIsOpen(false)
    }

    const handleCancelModalUpdateInformation = () => {
        setIsOpen(false)
    }
    return (
        <Wrapper>
            <Avatar onClick={handleShowModalInformation} size={48} src="https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg" />
            <StyledModal className='infor' title="Thông tin tài khoản" open={isOpenInfor} onCancel={handleCancelModalInformation} onOk={handleOKModalInformation}
                footer={[
                    <Button key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalInformation}>Hủy</Button>,
                    <Button key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalInformation} type="primary">Đồng ý</Button>

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
                    <Form.Item>
                        <StyledNameEdit style={{ position: 'absolute', top: '-48px', left: '40%' }}>
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
                <StyledButton type='default' onClick={handleShowModalUpdateInformation}>Cập nhật thông tin</StyledButton>
            </StyledModal>
            <StyledModal
                className='infor'
                title='Cập nhật tài khoản'
                open={isOpen}
                onCancel={handleCancelModalUpdateInformation}
                footer={[
                    <Button key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalUpdateInformation}>
                        Hủy
                    </Button>,
                    <Button
                        type="primary"
                        icon={<UserOutlined />}
                        style={{ fontWeight: 700 }}
                        onClick={handleOKModalUpdateInformation}
                    >
                        Cập nhật
                    </Button>,
                ]}
                onOk={handleOKModalUpdateInformation}
            >
                <StyledForm
                    name="signup"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item>
                        <StyledAvatarNen></StyledAvatarNen>
                    </Form.Item>
                    <Form.Item style={{ margin: '0' }}>
                        <StyledAvatar style={{ display: 'initial', position: 'absolute', top: '-75px', left: '63%', border: '3px solid white', width: '80px', height: '80px' }}></StyledAvatar>
                        <CameraOutlined className='cameraUpdate' />
                    </Form.Item>
                    <Form.Item
                        label="Tên hiển thị"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="dateOfBirth"
                    >
                        <DatePicker defaultValue={moment(new Date())} format={'DD/MM/YYYY'} autoComplete />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gioitinh"
                    >
                        <Radio.Group defaultValue={'Nam'}>
                            <Radio value="Nam">Nam</Radio>
                            <Radio value="Nữ">Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>

                </StyledForm>
            </StyledModal>
        </Wrapper>
    );
}

export default AvatarImg;
const Wrapper = styled.nav`
    width: 100%;
    height: 64px;
    margin-bottom: 16px;
    &:hover {
        cursor: pointer;
    }
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
    #signup_name,
    #signup_dateOfBirth{
        margin: 0;
    }
    .cameraUpdate{
        position: absolute;
        left: 87%;
        top: -16px;
        font-size: 18px;
        border-radius: 50%;
        background-color: #fff;
        border: 3px solid #fff;
        box-shadow: 0 0 0 1px #ccc;
    }
    
`
const StyledText = styled.p`
    font-size: 16px;
    margin: 0;
    display: inline;
    margin: 4px 0;
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
    box-shadow: 0 0 0 1px #ccc;
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
    left: 50%;
    transform: translateX(-50%);
    background-color: ${borderInfor};
    border-radius: 4px;
`
const StyledBorder = styled.div`
    border-bottom: 8px solid ${borderInfor};
    width: 380px;
    position: absolute;
    bottom: 294px;
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
const StyledInforPerson = styled.div`
    font-size: 20px;
    font-weight: 700;
`;