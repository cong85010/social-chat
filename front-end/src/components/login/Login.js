import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    LoginOutlined,
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    UserOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, message, Modal, Radio, Row, Tabs } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { SignInUser, SignUpUser } from '~/redux/slices/UserSlice';
import { text } from '~/utils/color';
import { URL } from '~/utils/constant';
import background from '../img/background.jpg';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError, message: messages, user } = useSelector((state) => state.user);
    const [checkOTP, setCheckOTP] = useState(false);
    const [isShowModalOTP, setIsShowModalOTP] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [form] = Form.useForm();
    const [formPhone] = Form.useForm();

    const onFinish = async (values) => {
        dispatch(SignInUser({ user: values }));
    };

    const onSignUp = () => {
        form.validateFields()
            .then((values) => {
                delete values.confirmPassword;
                dispatch(SignUpUser({ phoneNumber: formPhone.getFieldValue('phoneNumber'), ...values }));
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const onFinishFailed = (errorInfo) => {
        alert('Fail dang ki!!');
        console.log('Failed:', errorInfo);
    };

    const handleShowModal = () => {
        setIsOpen(true);
    };
    const handleOkModal = () => {
        setIsOpen(false);
    };
    const handleCancelModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            message.success(messages);
        }
        if (isError) {
            message.error(messages);
        }
    }, [isLoading, isSuccess, isError, message]);

    const handleCheckPhone = async ({ phoneNumber }) => {
        try {
            setIsLoadingRegister(true);
            const { data } = await fetch(`${URL}/api/user/existed/${phoneNumber}`);
            if (data.data) {
                message.error('Số điện thoại đã được sử dụng');
            } else {
                setIsShowModalOTP(true);
            }
        } catch (error) {
            message.error('Oh Nooo!!! Có lỗi xảy ra.');
        }
        // setIsShowModalOTP(true)
        setIsLoadingRegister(false);
        setIsOpen(true);
    };

    const handleChangeOTP = (value) => {
        console.log(value);
    };

    return (
        <StyledContainer>
            <StyledHeader>
                <ImgTitle>
                    <StyledImg
                        src="https://image.bnews.vn/MediaUpload/Org/2022/08/05/1200x600wa-20220805120828.png"
                        alt=""
                        style={{ left: '0' }}
                    />
                    <StyledImg
                        src="https://stc-zaloid.zdn.vn/zaloid/client/images/zlogo.png"
                        alt=""
                        srcset=""
                        style={{ right: '-40px' }}
                    />
                </ImgTitle>
                <StyledContact>
                    <span className="contact numPhone">
                        <PhoneOutlined />
                        +84 1234 567 891
                    </span>
                    <span className="contact mail">
                        <MailOutlined />
                        zalo@gmail.com
                    </span>
                </StyledContact>
            </StyledHeader>
            <StyledContent>
                <BodyContentLeft>
                    <BodyContentLeftTitle>
                        Tán gẫu với bạn bè & <br />
                        Kết nối với cả cộng đồng
                    </BodyContentLeftTitle>
                    <BodyContentLeftImg>
                        <img
                            className="body__img-detail img-1"
                            src="https://img.freepik.com/vector-premium/videollamadas-chateando-amigos_23-2148508013.jpg"
                            alt=""
                            srcset=""
                        />
                        <img
                            className="body__img-detail img-2"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVIH3e9H3RyXGU0DgO8l2KlF2NXOLA-tEsgmsF34tSB8z0bHSJijYQIDTNE2x7n7GeUc&usqp=CAU"
                            alt=""
                            srcset=""
                        />
                        <img
                            className="body__img-detail img-3"
                            src="https://thumbs.dreamstime.com/b/video-call-group-chat-to-family-friends-computer-video-call-group-chat-to-family-friends-computer-vector-cartoon-196979760.jpg"
                            alt=""
                            srcset=""
                        />
                        <img
                            className="body__img-detail img-5"
                            src="https://media.istockphoto.com/vectors/virtual-group-meeting-being-held-via-video-conference-from-home-using-vector-id1277210356?k=20&m=1277210356&s=612x612&w=0&h=puqzG1bdLxt2kWmN264TYuNMhB6zyWsG0T2Vhi68-pM="
                            alt=""
                            srcset=""
                        />
                        <img
                            className="body__img-detail img-6"
                            src="https://i0.wp.com/adahma.org/wp-content/uploads/2020/10/video-llamadas-amigos_23-2148504068.jpg?fit=626%2C417&ssl=1g"
                            alt=""
                            srcset=""
                        />
                        <img
                            className="body__img-detail img-7"
                            src="https://static.vecteezy.com/system/resources/previews/005/608/321/non_2x/video-call-concept-video-call-with-your-loved-ones-man-holding-tablet-while-talking-face-to-face-on-screen-flat-style-cartoon-illustration-vector.jpg"
                            alt=""
                            srcset=""
                        />
                    </BodyContentLeftImg>
                </BodyContentLeft>
                <BodyContentRight>
                    <BodyContentRightForm>
                        <Tabs defaultActiveKey="1" style={{ height: '250px' }}>
                            {/* Đăng nhập */}
                            <Tabs.TabPane tab="ĐĂNG NHẬP" key="1">
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    // initialValues={{ remember: false }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        rules={[
                                            {
                                                required: true,
                                                pattern: /^0[0-9]{9}$/,
                                                message: 'Vui lòng nhập số điện thoại của bạn!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="password"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                                    >
                                        <Input.Password></Input.Password>
                                    </Form.Item>
                                    <ForgetPass className="forget">
                                        <a href="">Quên mật khẩu?</a>
                                    </ForgetPass>
                                    {/* <Form.Item
                                        style={{ textAlign: 'right' }}
                                        name="remember"
                                        valuePropName="checked"
                                        wrapperCol={{ offset: 8, span: 16 }}
                                        className="remember"
                                    >
                                        <Checkbox>Nhớ tài khoản</Checkbox>
                                    </Form.Item> */}
                                    <Row justify="center">
                                        <StyledButton
                                            type="primary"
                                            icon={<LoginOutlined />}
                                            loading={isLoading}
                                            htmlType="submit"
                                        >
                                            ĐĂNG NHẬP
                                        </StyledButton>
                                    </Row>
                                </Form>
                            </Tabs.TabPane>
                            {/* Đăng kí */}
                            <Tabs.TabPane tab="ĐĂNG KÝ" key="2">
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ phoneNumber: '0123456789' }}
                                    onFinish={handleCheckPhone}
                                    autoComplete="off"
                                    form={formPhone}
                                >
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        rules={[
                                            {
                                                required: true,
                                                pattern: /^0[0-9]{9}$/,
                                                message: 'Vui lòng nhập số điện thoại của bạn!',
                                            },
                                        ]}
                                    >
                                        <Input defaultValue={'0368795645'} />
                                    </Form.Item>

                                    <p>
                                        Bằng việc đăng kí, bạn đã đồng ý với Zalo về <a href="">Điều khoản dịch vụ</a> &{' '}
                                        <a href="">Chính sách bảo mật</a>
                                    </p>
                                    <br />
                                    <Row justify="center">
                                        <StyledButton
                                            type="primary"
                                            icon={<LoginOutlined />}
                                            loading={isLoadingRegister}
                                            htmlType="submit"
                                        >
                                            ĐĂNG KÝ
                                        </StyledButton>
                                    </Row>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs>
                        <StyledModal
                            open={isOpen}
                            onCancel={handleCancelModal}
                            // footer={[
                            //     <Button key="back" onClick={handleCancelModal}>
                            //         Hủy
                            //     </Button>,
                            //     <Button
                            //         type="primary"
                            //         icon={<UserOutlined />}
                            //         loading={isLoadingRegister}
                            //         onClick={onSignUp}
                            //     >
                            //         Cập nhật
                            //     </Button>,
                            // ]}
                            onOk={onSignUp}
                        >
                            <StyledInforPerson>Thông tin tài khoản</StyledInforPerson>
                            <Divider />
                            <StyledForm
                                form={form}
                                name="signup"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tên hiển thị"
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày sinh"
                                    name="dateOfBirth"
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày sinh của bạn!' }]}
                                >
                                    <DatePicker defaultValue={moment(new Date())} format={'DD/MM/YYYY'} autoComplete />
                                </Form.Item>
                                {/* <Form.Item
                                    label="Giới tính"
                                    name="gioitinh"
                                    rules={[{ required: true, message: 'Vui lòng nhập giới tính của bạn!' }]}
                                >
                                    <Radio.Group defaultValue={''}>
                                        <Radio value="Nam">Nam</Radio>
                                        <Radio value="Nữ">Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item> */}
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Xác nhận MK"
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu xác nhận của bạn!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Chưa khớp'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </StyledForm>
                        </StyledModal>
                    </BodyContentRightForm>
                </BodyContentRight>
            </StyledContent>
            <StyledFooter>
                <FooterTitleLink>Dùng tài khoản Zalo để truy cập các ứng dụng mạng xã hội khác</FooterTitleLink>
                <FooterLinkSocials>
                    <a href="">
                        <InstagramOutlined className="icon" />
                    </a>
                    <a href="">
                        <FacebookOutlined className="icon" />
                    </a>
                    <a href="">
                        <YoutubeOutlined className="icon" />
                    </a>
                    <a href="">
                        <TwitterOutlined className="icon" />
                    </a>
                    <a href="">
                        <LinkedinOutlined className="icon" />
                    </a>
                </FooterLinkSocials>
            </StyledFooter>
        </StyledContainer>
    );
}

/* Animation */
const FadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;
const FadeInUp1 = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;
const FadeInUp2 = keyframes`
    from {
        opacity: 0;
        transform: translateX(35px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;
const LeftToRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(-105px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;
const StyledSection = styled.div`
    position: relative;
    font-size: 62.5%;
`;

// Header va container
const StyledContainer = styled.div`
    /* position: relative; */
    height: 1024px;
    width: 100%;
`;

const StyledHeader = styled(Header)`
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    box-shadow: 0 0 1px #00000052;
    height: 64px;
`;
const ImgTitle = styled.div`
    position: absolute;
    width: 140px;
    height: 64px;
    padding: 0 50px;
`;

const StyledImg = styled.img`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
`;
const StyledContact = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 400px;
    right: 70px;
    .contact {
        font-size: 20px;
        font-weight: 600;
    }
    .anticon {
        margin-right: 6px;
    }
`;
// Body
const StyledContent = styled(Content)`
    position: relative;
    top: 64px;
    /* min-width: 820px;
    min-height: 1000px; */
    width: 100%;
    height: 100%;
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    padding-top: 80px;
`;
const BodyContentLeft = styled.div`
    width: 50%;
    max-height: 400px;
    display: block;
`;
const BodyContentLeftTitle = styled.p`
    position: absolute;
    padding-left: 80px;
    font-size: 2.2rem;
    font-weight: 800;
    text-align: left;
    color: ${text};
`;
const BodyContentLeftImg = styled.div`
    width: 600px;
    height: 350px;
    position: absolute;
    padding-left: 80px;
    left: 150px;
    top: 200px;
    .body__img-detail {
        border-radius: 50%;
        width: 120px;
        margin-top: 40px;
    }
    .img-1 {
        position: absolute;
        top: 0;
        left: 0;
        animation: ${FadeInUp} ease-in 0.6s;
    }
    .img-2 {
        position: absolute;
        top: 0;
        left: 250px;
        animation: ${FadeInUp2} linear 0.6s;
    }
    .img-3 {
        position: absolute;
        top: 0;
        left: 500px;
        animation: ${FadeInUp} ease-in 0.6s;
    }
    .img-4 {
        position: absolute;
        right: -80px;
        top: 30px;
        animation: ${FadeInUp2} ease-in-out 0.6s;
    }
    .img-5 {
        position: absolute;
        left: 130px;
        top: 200px;
        animation: ${FadeInUp1} ease-out 0.6s;
    }
    .img-6 {
        position: absolute;
        left: 340px;
        top: 200px;
        animation: ${FadeInUp2} ease-in 0.6s;
    }
    .img-7 {
        position: absolute;
        left: 580px;
        top: 200px;
        animation: ${FadeInUp} 0.6s ease-in both;
    }
`;
const BodyContentRight = styled.div`
    width: 50%;
    display: block;
    max-height: 400px;
`;
const BodyContentRightForm = styled.div`
    width: 450px;
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 20px 40px;
    box-shadow: 0 0 1px #727272;
    position: relative;
    right: -200px;
    label {
        font-size: 16px;
    }
    .ant-tabs-tab-btn {
        font-size: 20px;
    }
    .ant-tabs-nav {
        transform: translate(22%, 0px);
    }
`;

// const StyledTabTabPane = styled(Tabs.TabPane)`
//     list-style-type: none;
//     font-size: 1.8rem;
//     font-weight: 600;
//     position: relative;
//     display: flex;
//     justify-content: space-between;
//     padding: 0;
//     outline: none;
// `;

// const StyledTab = styled(Tab)`
//     cursor: pointer;
//     color: ${text};
//     &.tab-register:hover,
//     &.tab-login:hover{
//         transform: translateY(-1px);
//     }

//     &.tab-login::after{
//         content: "";
//         display: block;
//         height: 100%;
//         width: 2px;
//         background-color: #333;
//         position: absolute;
//         top: 50%;
//         transform: translateY(-50%);
//         left: 210px;
//     }
// `;
const ForgetPass = styled.p`
    text-align: right;
    position: relative;
    top: -10px;
    margin: 0;
    font-size: 16px;
`;

const StyledTextRes = styled.p`
    font-size: 16px;
    text-align: center;
`;

const StyledButton = styled(Button)`
    width: 150px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    left: 25px;
`;

//  Footer
const StyledFooter = styled(Footer)`
    position: absolute;
    top: 600px;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
`;
const FooterTitleLink = styled.p`
    font-size: 18px;
`;
const FooterLinkSocials = styled.div`
    text-align: center;
    .icon {
        font-size: 1.4rem;
        margin: 0 10px;
        &:hover {
            transition: transform ease-in-out 0.1s;
            will-change: transform;
        }
    }
`;
// modal
const StyledModal = styled(Modal)`
    button {
        font-size: 16px;
        line-height: 16px;
        font-weight: 600;
    }
`;
const StyledInforPerson = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const StyledForm = styled(Form)`
    label {
        font-size: 18px;
    }
`;
export default Login;