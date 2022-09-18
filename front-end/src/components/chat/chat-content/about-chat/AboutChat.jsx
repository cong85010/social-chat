import styled from 'styled-components';
import React from 'react';
import { bgColor, border } from '~/utils/color';
import { EditOutlined, TeamOutlined, BellOutlined, PushpinOutlined } from '@ant-design/icons';

function AboutChat() {
 return (
  <Wrapper>
   <HeaderAbout>Thông Tin</HeaderAbout>

   <InfoComponent>
    <ImgComponent>
     <Avatar src="https://icdn.dantri.com.vn/thumb_w/640/2017/12-1510967806439.jpg" />
    </ImgComponent>

    <NameComponent>
     <Name>Your Name</Name>
     <EditNameBtn>
      <EditOutlined />
     </EditNameBtn>
    </NameComponent>

    <OptComponent>
     <BoxOpt>
      <OptButton>
       <BellOutlined />
      </OptButton>
     </BoxOpt>
     <BoxOpt>
      <OptButton>
       <PushpinOutlined />
      </OptButton>
     </BoxOpt>
     <BoxOpt>
      <OptButton>
       <TeamOutlined />
      </OptButton>
     </BoxOpt>
     <BoxOpt>Tắt thông báo</BoxOpt>
     <BoxOpt>Bỏ ghim hội thoại</BoxOpt>
     <BoxOpt>Tạo nhóm trò chuyện</BoxOpt>
    </OptComponent>
   </InfoComponent>

   <ReminderBtn></ReminderBtn>
  </Wrapper>
 );
}

export default AboutChat;

const Wrapper = styled.nav`
 display: flex;
 flex-direction: column;
 width: 343px;
 height: 100%;
 border-left: 1px solid ${border};
`;

const HeaderAbout = styled.div`
 display: flex;
 border-bottom: 1px solid ${border};
 width: 100%;
 height: 68px;
 justify-content: center;
 flex-direction: column;
 font-size: 18px;
 font-weight: bold;
`;

const InfoComponent = styled.div`
 display: flex;
 align-items: center;
 border-bottom: 10px solid #c7c2c2;
 width: 100%;
 height: 240px;
 flex-direction: column;
`;

const ImgComponent = styled.div`
 display: flex;
 justify-content: center;
 width: 100%;
 height: 65px;
 margin-top: 15px;
`;

const Avatar = styled.img`
 width: 64px;
 height: 64px;
 border-radius: 50% 50% 50% 50%;
`;

const NameComponent = styled.div`
 display: flex;
 justify-content: center;
 width: 100%;
 height: 30px;
 margin-top: 7px;
`;

const Name = styled.div`
 font-size: 16px;
 font-weight: bold;
 height: 100%;
 width: 100px;
`;

const EditNameBtn = styled.button`
 height: 24px;
 width: 24px;
 border-radius: 50% 50% 50% 50%;
 border: none;
 margin-left: 10px;
 background-color: #e1e4ea;
 &:hover {
  background-color: #d5d5d6;
 }
`;

const OptComponent = styled.div`
 display: flex;
 flex-wrap: wrap;
 align-content: center;
 justify-content: space-evenly;
 width: 270px;
 height: 80px;
 margin-top: 20px;
`;

const BoxOpt = styled.div`
 width: 70px;
 height: 35px;
 font-size: 12px;
 padding: 0;
 margin: 0;
`;

const OptButton = styled.button`
 height: 30px;
 width: 30px;
 border-radius: 50% 50% 50% 50%;
 border: none;
 background-color: #e1e4ea;
 &:hover {
  background-color: #d5d5d6;
 }
`;

const ReminderBtn = styled.button`
 width: 100%;
 height: 50px;
 border: none;
 border-bottom: 10px solid #c7c2c2;
 background-color: ${bgColor};
 &:hover {
  background-color: #c7c2c2;
 }
`;
