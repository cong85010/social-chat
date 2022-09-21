import { Button, Checkbox, Divider, Form, Input, Menu, message, Space } from 'antd';
import React, { useEffect } from 'react';
import { Header, Footer, Content } from 'antd/lib/layout/layout';
import {
    InstagramOutlined,
    FacebookOutlined,
    YoutubeOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import background from '../img/background.jpg';
import { primaryColor, text } from '~/utils/color';
import { keyframes } from 'styled-components';
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { SignInUser, SignUpUser } from '~/redux/slices/UserSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError, message: messages } = useSelector((state) => state.user);
    const onFinish = async (values) => {
        dispatch(SignInUser({ user: values }));
    };

    const onSignUp = (values) => {
        console.log('Failed:', values);
        dispatch(SignUpUser({ user: values }));
    };

    const onFinishFailed = (errorInfo) => {
        alert('Fail!!');
        console.log('Failed:', errorInfo);
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

    return (
        <Container style={{ backgroundImage: `url(${background})` }}>
            <Navbar>
                <ImgTitle className="header__title">
                    <img
                        src="https://image.bnews.vn/MediaUpload/Org/2022/08/05/1200x600wa-20220805120828.png"
                        alt=""
                        className="header__title-img"
                    />
                    <img
                        src="https://stc-zaloid.zdn.vn/zaloid/client/images/zlogo.png"
                        alt=""
                        srcset=""
                        className="title__web"
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
            </Navbar>
            <ContentBody>
                <BodyContentLeft>
                    <BodyContentLeftTitle>Tán gẫu với bạn bè & Kết nối với cả cộng đồng</BodyContentLeftTitle>
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
                            className="body__img-detail img-4"
                            src="https://thumbs.dreamstime.com/b/computer-display-web-camera-cartoon-people-conference-video-call-technology-internet-chat-image-webinar-meeting-192326674.jpg"
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
                        <Tabs>
                            <TabList
                                style={{
                                    listStyleType: 'none',
                                    fontSize: '1.8rem',
                                    fontWeight: '600',
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Tab style={{ display: 'inline-block', color: text, cursor: 'pointer' }}>ĐĂNG NHẬP</Tab>
                                <PseudoClass></PseudoClass>
                                <Tab style={{ display: 'inline-block', color: text, cursor: 'pointer' }}>ĐĂNG KÝ</Tab>
                            </TabList>

                            {/* Đăng nhập */}
                            <TabPanel>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: false }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        rules={[{
                                            required: true,
                                            pattern: /^0[0-9]{9}$/,
                                            message: 'Vui lòng nhập số điện thoại của bạn!',
                                        },]}
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
                                    <Button
                                        style={{
                                            width: '200px',
                                            height: '50px',
                                            fontSize: '22px',
                                            fontWeight: 600,
                                            position: 'relative',
                                            left: '38px',
                                        }}
                                        type="primary"
                                        className="btn-login"
                                        htmlType="submit"
                                        loading={isLoading}
                                    >
                                        ĐĂNG NHẬP
                                    </Button>
                                </Form>
                            </TabPanel>

                            {/* Đăng kí */}
                            <TabPanel style={{ height: '' }}>
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: false }}
                                    onFinish={onSignUp}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Tên"
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        rules={[{ required: true, pattern: /^0[0-9]{9}$/, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
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

                                    <Form.Item
                                        label="Xác nhận"
                                        name="cofirmPassword"
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
                                        <Input.Password></Input.Password>
                                    </Form.Item>

                                    <Button
                                        style={{
                                            width: '200px',
                                            height: '50px',
                                            fontSize: '22px',
                                            fontWeight: 600,
                                            position: 'relative',
                                            left: '38px',
                                        }}
                                        type="primary"
                                        className="btn-login"
                                        htmlType="submit"
                                    >
                                        ĐĂNG KÝ
                                    </Button>
                                </Form>
                            </TabPanel>
                        </Tabs>
                    </BodyContentRightForm>
                </BodyContentRight>
            </ContentBody>
            <FooterContainer>
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
            </FooterContainer>
        </Container>
    );
}
//  Footer

const FooterContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
`;

const FooterTitleLink = styled.p`
    font-size: 16px;
`;

const FooterLinkSocials = styled.div`
    .icon {
        font-size: 1.4rem;
        margin: 0 10px;
        &:hover {
            transition: transform ease-in-out 0.1s;
            will-change: transform;
        }
    }
`;

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

// Header va container
const Container = styled.div`
    font-size: 62.5%;
    position: relative;
    height: 100vh;
`;


const Navbar = styled.div`
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 0 1px #00000052;
    height: 64px;
    line-height: 64px;
    padding: 0 50px;
`;

const ImgTitle = styled.div`
    position: relative;
    width: 140px;
    display: flex;
    justify-content: space-between;
    .title__web {
        position: absolute;
        width: 100px;
        top: 50%;
        transform: translateY(-50%);
        right: -42px;
    }
    .header__title-img {
        position: absolute;
        width: 100px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const StyledContact = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
    .contact {
        font-size: 20px;
        font-weight: 600;
    }
    .anticon {
        margin-right: 6px;
    }
`;
// Body
const ContentBody = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BodyContentLeft = styled.div`
    width: 70%;
    position: absolute;
    left: 200px;
    top: 40%;
    transform: translateY(-50%);
`;

const BodyContentLeftTitle = styled.p`
    font-size: 2.4rem;
    font-weight: 800;
    text-align: left;
    color: ${text};
`;

const BodyContentLeftImg = styled.div`
    width: 750px;
    display: block;
    position: absolute;
    .body__img-detail {
        border-radius: 50%;
        width: 120px;
        height: 120px;
        margin-top: 40px;
        object-fit: cover;
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

const BodyContentRight = styled.div``;

const BodyContentRightForm = styled.div`
    width: 30%;
    background-color: #f8f8f8;
    border-radius: 6px;
    padding: 20px 40px 20px 0;
    box-shadow: -1px 4px 8px #888888;
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translateY(-50%);
    z-index: 2;
    `;

const PseudoClass = styled.p`
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: 2.2rem;
    background-color: #443f3f;
    top: 50%;
    transform: translateY(-50%);
    left: 246px;
`;

const ForgetPass = styled.p`
    text-align: right;
    position: relative;
    top: -10px;
    margin: 0;
    
`;
export default Login;
