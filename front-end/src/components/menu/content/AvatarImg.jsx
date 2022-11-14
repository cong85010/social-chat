import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Avatar, DatePicker, Input, message, Row } from 'antd';

import { border, borderInfor, primaryColor, text } from '~/utils/color';
import Modal from 'antd/lib/modal/Modal';
import { Button, Collapse, Divider, Form, Menu, Radio, Upload } from 'antd';
import moment from 'moment/moment';
import { UserOutlined, CameraOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { AvatarDefault, beforeUpload, getBase64, URL } from '~/utils/constant';
import { getToken } from '~/utils/function';
import { updateUser } from '~/redux/slices/UserSlice';

function AvatarImg() {
    const [isOpenInfor, setIsOpenInformation] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formProfile] = Form.useForm()
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);


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

    // doi mat khau moi
    const [isShowModalNewPassword, setIsShowModalNewPassword] = useState(false);
    const handleShowModalNewPassword = () => {
        setIsShowModalNewPassword(true);
    };

    const handleOkModalNewPassword = () => {
        setIsShowModalNewPassword(false);
    };

    const handleCancelModalNewPassword = () => {
        setIsShowModalNewPassword(false);
    };

    const handleUpdateProfile = (values) => {

        axios.put(`${URL}/api/user/update`, {
            ...values,
            avatar: imageUrl,
            id: user.id,
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                Accept: 'application/json',
            },
        }).then(res => {
            message.success("Cập nhật thông tin thành công");
            setIsOpen(false)
            console.log(res);
            dispatch(updateUser(res?.data?.data))
        }).catch(err => message.error(err))
    }

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(user.avatar);

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
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <Wrapper style={{ textAlign: 'center' }}>
            <Avatar onClick={handleShowModalInformation} size={48} src={user?.avatar || AvatarDefault} />
            {/* thông tin tài khoản */}
            <StyledModal destroyOnClose centered className='infor' title="Thông tin tài khoản"
                open={isOpenInfor}
                onCancel={handleCancelModalInformation}
                onOk={handleOKModalInformation}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalInformation}>Hủy</Button>,
                    <Button loading={isLoading} key="submit" style={{ fontWeight: 700 }} onClick={handleOKModalInformation} type="primary">Đồng ý</Button>

                ]}>
                <StyledForm name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} initialValues={{ remember: false }}
                    autoComplete="off">
                    {/* <Form.Item>
                        <StyledAvatarNen></StyledAvatarNen>
                    </Form.Item> */}
                    <StyledAvatarNen></StyledAvatarNen>

                    <Form.Item>
                        <StyledAvatar alt="Avatar" src={user?.avatar || AvatarDefault} style={{ display: 'initial', position: 'absolute', top: '-75px', left: '50%', border: '3px solid white', width: '80px', height: '80px' }}></StyledAvatar>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <StyledNameEdit eEdit>
                            <StyledName style={{ margin: '0 auto' }}>{user?.name || "Loading..."}</StyledName>
                        </StyledNameEdit>
                    </Form.Item>
                    <StyledBorder></StyledBorder>
                    <Form.Item wrapperCol={{ span: 24 }} style={{ height: '100px' }}>
                        <StyledContainInfor>
                            <StyledText style={{ top: '-30px' }}><h3 style={{ fontWeight: 500, fontSize: '16px' }}>Thông tin cá nhân</h3></StyledText>
                            <StyledDetailInfor>
                                <StyledText>Số điện thoại</StyledText>
                                <StyledText>{user.phoneNumber || "Loading..."}</StyledText>
                            </StyledDetailInfor>
                            <StyledDetailInfor>
                                <StyledText>Giới tính</StyledText>
                                <StyledText>{user?.gender ? 'Nam' : 'Nữ'}</StyledText>
                            </StyledDetailInfor>
                            <StyledDetailInfor>
                                <StyledText>Ngày sinh</StyledText>
                                <StyledText>{moment(user?.dateOfBirth).format("DD/MM/YYYY")}</StyledText>
                            </StyledDetailInfor>
                        </StyledContainInfor>
                    </Form.Item>
                </StyledForm>
                <StyledButton type='ghost' className='btn-doi-mk' onClick={handleShowModalUpdateInformation}>Cập nhật thông tin</StyledButton>
                <StyledButton type='primary' onClick={handleShowModalNewPassword}>Đổi mật khẩu</StyledButton>
            </StyledModal>
            {/* Cập nhật tài khoản */}
            <StyledModal
                destroyOnClose
                centered
                className='infor'
                title='Cập nhật tài khoản'
                open={isOpen}
                onCancel={handleCancelModalUpdateInformation}
                footer={[
                    <Button loading={isLoading} key="back" style={{ fontWeight: 700 }} onClick={handleCancelModalUpdateInformation}>
                        Hủy
                    </Button>,
                    <Button loading={isLoading}
                        type="primary"
                        icon={<UserOutlined />}
                        style={{ fontWeight: 700 }}
                        htmlType="submit"
                        onClick={() => formProfile.submit()}
                    >
                        Cập nhật
                    </Button>,
                ]}
                onOk={handleOKModalUpdateInformation}
            >
                <StyledForm
                    form={formProfile}
                    name="signup"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete="off"
                    initialValues={{
                        name: user.name,
                        dateOfBirth: moment(user.dateOfBirth),
                        gender: user.gender
                    }}
                    onFinish={handleUpdateProfile}
                    in
                >

                    <StyledAvatarNen src={imageUrl} />
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Upload
                            name="avatar"
                            action="/"
                            listType="picture-card"
                            className="avatar-uploader"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            maxCount={1}
                        >
                            {imageUrl ? <img src={imageUrl} width="100" height="100" /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    {/* <Form.Item style={{ textAlign: 'center' }}>
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
                    </Form.Item> */}
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
                        <DatePicker format={'DD/MM/YYYY'} autoComplete />
                    </Form.Item>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                    >
                        <Radio.Group defaultValue={user.gender}>
                            <Radio value={true} name='gender'>Nam</Radio>
                            <Radio value={false} name='gender'>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>

                </StyledForm>
            </StyledModal >
            {/* Đổi mật khẩu */}
            <StyledModal
                title="Đổi mật khẩu mới"
                open={isShowModalNewPassword}
                onCancel={handleCancelModalNewPassword}
                onOk={handleOkModalNewPassword}
                footer={[
                    <Button loading={isLoading} key="back" onClick={handleCancelModalNewPassword}>
                        Hủy
                    </Button>,
                    <Button loading={isLoading} key="submit" onClick={handleOkModalNewPassword} type="primary">
                        Đồng ý
                    </Button>,
                ]}
            >
                <StyledForm
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    initialValues={{ remember: false }}
                    autoComplete="off"
                >
                    <Form.Item label="Nhập mật khẩu hiện tại" name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu hiện tại của bạn!',
                            },
                        ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Nhập mật khẩu mới"
                        name="newPassword"
                        rules={[{
                            required: true,
                            message: 'Nhập mật khẩu hiện tại của bạn!'
                        }]}>
                        <Input.Password />

                    </Form.Item>
                    <Form.Item label="Xác nhận mật khẩu mới"
                        name="reNewPassword"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu xác nhận của bạn!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Chưa khớp'));
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>
                </StyledForm>
            </StyledModal>
        </Wrapper >
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
    .ant-form-item-label>label{
        font-size: 15px;
    }
`
const StyledForm = styled(Form)`
    .ant-form-item{
        margin: 0 0 10px;
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
    .ant-upload-list-picture-card .ant-upload-list-item-error{
        border-color: ${primaryColor};
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
    width: 64px;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 0 1px #ccc;
    object-fit: cover;
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
    border-radius: 4px;
    &.btn-doi-mk{
        margin-bottom:8px;
    }
`
const StyledBorder = styled.div`
    border-bottom: 8px solid ${borderInfor};
    width: 380px;
    position: absolute;
    bottom: 270px;
    left: 0;
`
const StyledContainInfor = styled.div`
    position: relative;
    top: -50px;
`
const StyledDetailInfor = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const StyledInforPerson = styled.div`
    font-size: 20px;
    font-weight: 700;
`;